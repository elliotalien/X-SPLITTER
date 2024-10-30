import localFont from "next/font/local";
import "./globals.css";

// LOCAL FONTS
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// METADATA OBJECT TO HANDLE SEO
export const metadata = {
  title: "X SPLITTER",
  description: "THIS PROJECT IS A VIDEO UPLOADING AND SEGMENTATION PLATFORM THAT ALLOWS USERS TO EASILY UPLOAD LARGE VIDEOS, WHICH ARE AUTOMATICALLY SPLIT INTO SMALLER SEGMENTS USING FFMPEG. BUILT WITH NEXT.JS, REACT, AND NODE.JS, IT PROVIDES A SIMPLE, USER-FRIENDLY INTERFACE FOR UPLOADING VIDEOS AND PLAYING OR DOWNLOADING SEGMENTS DIRECTLY. THE PLATFORM IS DESIGNED FOR EFFICIENT VIDEO MANAGEMENT, MAKING IT IDEAL FOR SCENARIOS LIKE EDUCATION, MEDIA SHARING, OR VIDEO EDITING. IT ALSO INCLUDES AUTOMATIC TEMPORARY FILE CLEANUP TO MAINTAIN PERFORMANCE AND STORAGE EFFICIENCY.",
  icons: {
    icon: "image/favicon.png", 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* BODY WITH CUSTOM FONTS */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
