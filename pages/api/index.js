import UploadForm from "@/components/UploadForm";

export default function Hero() {
  return (
    <div className="min-h-screenflex items-center justify-center">
      <div className="bg-custom-image bg-repeat bg-cover bg-bottom  rounded-lg">
        <div className="w-full h-screen bg-blackOverlay">
        <h1 className="text-7xl font-bold text-center pt-10 max-sm:text-5xl">X SPLITTER</h1>
        <p className="text-center mb-6 max-sm:text-xs">
        PLEASE UPLOAD THE VIDEO FILE, AND I&apos;LL HELP YOU SPLIT IT INTO 2-MINUTE SEGMENTS.
        </p>
        <UploadForm />
        </div>
      </div>
    </div>
  );
}
