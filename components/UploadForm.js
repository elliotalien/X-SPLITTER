"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Upload } from "lucide-react";
import { Footer } from "./Footer";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [outputLinks, setOutputLinks] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [segmentTime, setSegmentTime] = useState("120");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      toast.error("Please select a video file to upload.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("video", file);
    formData.append("segmentTime", segmentTime);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setOutputLinks(data.files);
        toast.success("Video uploaded successfully!");
      } else {
        toast.error("There was an error uploading your video.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSegmentTimeChange = (e) => {
    const value = e.target.value;
    if (value && !isNaN(value)) {
      setSegmentTime(value);
      console.log("Selected segment time:", value);
    }
  };

  return (
    <>
    <div className="flex flex-col lg:flex-row  p-4">
      <div className="w-full lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
        <div className="shadow-lg rounded-lg p-8 w-full">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer ${file ? "" : "centered"}`}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-4 " />
                  <p className="mb-2 text-sm ">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs ">
                    MP4, AVI, MOV or other video formats
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept="video/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            {file && (
              <p className="text-sm  text-center">
                Selected file: {file.name}
              </p>
            )}
            <div className="flex items-center justify-center w-full">
              <label htmlFor="segment-time" className="mr-2">Segment Time (seconds):</label>
              <input
                id="segment-time"
                type="number"
                value={segmentTime}
                onChange={handleSegmentTimeChange}
                className="border rounded p-2 w-20 text-black"
                min="1"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload Video"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="w-full lg:w-1/2">
        {outputLinks.length > 0 ? (
          <div className="shadow-lg rounded-lg p-8">
            <h2 className="text-xl font-medium mb-4 text-center">
              Trimmed Video Links:
            </h2>
            <table className="w-full">
              <tbody>
                {outputLinks.map((file) => (
                  <tr key={file}>
                    <td className="text-center">{file.split('/').pop()}</td>
                    <td className="text-center">
                      <button
                        onClick={() => setPlayingVideo(file)}
                        className="bg-blue-600 text-white py-1 px-3 rounded-md font-medium hover:bg-blue-700"
                        style={{ width: "80px" }}
                      >
                        Play
                      </button>
                    </td>
                    <td className="text-center">
                      <a
                        href={file}
                        download
                        className="bg-green-600 text-white py-1 px-3 rounded-md font-medium hover:bg-green-700"
                        style={{ width: "100px" }}
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="shadow-lg rounded-lg p-8">
            <h2 className="text-xl font-medium mb-4 text-center">
              ABOUT
            </h2>
            <p className="text-center">
              THIS PROJECT IS A VIDEO UPLOADING AND SEGMENTATION PLATFORM THAT ALLOWS USERS TO EASILY UPLOAD LARGE VIDEOS, WHICH ARE AUTOMATICALLY SPLIT INTO SMALLER SEGMENTS USING FFMPEG. BUILT WITH NEXT.JS, REACT, AND NODE.JS, IT PROVIDES A SIMPLE, USER-FRIENDLY INTERFACE FOR UPLOADING VIDEOS AND PLAYING OR DOWNLOADING SEGMENTS DIRECTLY. THE PLATFORM IS DESIGNED FOR EFFICIENT VIDEO MANAGEMENT, MAKING IT IDEAL FOR SCENARIOS LIKE EDUCATION, MEDIA SHARING, OR VIDEO EDITING. IT ALSO INCLUDES AUTOMATIC TEMPORARY FILE CLEANUP TO MAINTAIN PERFORMANCE AND STORAGE EFFICIENCY.
            </p>
          </div>
        )}
      </div>

      {playingVideo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="p-4 rounded-lg relative">
            <button
              onClick={() => setPlayingVideo(null)}
              className="absolute top-3 right-5 text-white text-5xl z-10"
            >
              &times;
            </button>
            <video
              src={playingVideo}
              controls
              className="w-full max-w-lg"
              autoPlay
            />
          </div>
        </div>
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
     
    </div>
     <Footer/>
     </>
  );
};

export default UploadForm;
