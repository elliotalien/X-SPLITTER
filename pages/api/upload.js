import fs from 'fs/promises';
import path from 'path';
import { IncomingForm } from 'formidable';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Use environment variable
  api_key: process.env.CLOUDINARY_API_KEY,       // Use environment variable
  api_secret: process.env.CLOUDINARY_API_SECRET,  // Use environment variable
});

const tempDir = path.join(process.cwd(), 'temp');

export const config = {
  api: {
    bodyParser: false,
  },
};

const handleVideoUpload = async (req, res) => {
  const form = new IncomingForm({
    maxFileSize: 10 * 1024 * 1024 * 1024, 
    maxTotalFileSize: 10 * 1024 * 1024 * 1024,
  });
  let segmentTime = 120; // Default segment time in seconds

  try {
    const { files, fields } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    // Update segmentTime with user-selected value if provided
    if (fields.segmentTime && !isNaN(fields.segmentTime)) {
      segmentTime = parseInt(fields.segmentTime, 10); // Use user-defined segment time
    }

    const videoFile = Array.isArray(files.video) ? files.video[0] : files.video;
    if (!videoFile) {
      res.status(400).json({ error: 'No video file uploaded' });
      return;
    }

    const originalFilename = videoFile.originalFilename || videoFile.name;
    const tempFilePath = path.join(tempDir, originalFilename);
    const segmentFiles = [];

    // Ensure temp directory exists
    await fs.mkdir(tempDir, { recursive: true });

    // Move uploaded file to temp directory
    await fs.rename(videoFile.filepath, tempFilePath);

    // Set FFmpeg path from ffmpeg-static
    ffmpeg.setFfmpegPath(ffmpegStatic);

    // Run FFmpeg command to segment video using the user-defined segment time
    await new Promise((resolve, reject) => {
      ffmpeg(tempFilePath)
        .outputOptions([
          '-map 0:v', 
          '-map 0:a', 
          '-c copy', 
          `-segment_time ${segmentTime}`, // Use user-defined segment time
          '-f segment', 
          '-reset_timestamps 1'
        ])
        .output(path.join(tempDir, 'segment_%03d.mp4'))
        .on('end', resolve)
        .on('error', reject)
        .run();
    });

    // Upload segmented files to Cloudinary
    const tempSegmentFiles = await fs.readdir(tempDir);
    await Promise.all(tempSegmentFiles.map(async file => {
      if (file.startsWith('segment_') && file.endsWith('.mp4')) {
        const oldPath = path.join(tempDir, file);
        
        // Upload to Cloudinary
        const uploadResult = await cloudinary.v2.uploader.upload(oldPath, {
          resource_type: 'video',
          public_id: `videos/${file.split('.')[0]}`, // Optional: specify a public ID
        });
        
        console.log(`Uploaded ${file} to Cloudinary: ${uploadResult.secure_url}`);
        segmentFiles.push(uploadResult.secure_url); // Store the Cloudinary URL
      }
    }));

    // Respond with success and list of segment files
    res.status(200).json({ 
      message: 'Video segmented and uploaded successfully', 
      files: segmentFiles,
    });

    // Schedule deletion of segmented files from Cloudinary after 5 minutes
    setTimeout(async () => {
      try {
        await Promise.all(segmentFiles.map(async (url) => {
          const publicId = `videos/${url.split('/').pop().split('.')[0]}`; // Get public ID from URL
          await cloudinary.v2.uploader.destroy(publicId, { resource_type: 'video' });
          console.log(`Deleted segmented file from Cloudinary after 5 minutes: ${publicId}`);
        }));
      } catch (deleteError) {
        console.error('Error deleting segmented files from Cloudinary:', deleteError);
      }
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

  } catch (error) {
    console.error('Error during video processing:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });

  } finally {
    // Clean up temporary files
    try {
      const tempSegmentFiles = await fs.readdir(tempDir);
      await Promise.all(tempSegmentFiles.map(async file => {
        const filePath = path.join(tempDir, file);
        try {
          await fs.access(filePath);
          await fs.unlink(filePath);
          console.log(`Deleted temporary file ${file}`);
        } catch (accessError) {
          // File doesn't exist, no need to delete
        }
      }));
    } catch (cleanupError) {
      console.error('Error cleaning up temporary files:', cleanupError);
    }
  }
};

export default handleVideoUpload;
