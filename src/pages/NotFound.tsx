import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#40190E] text-white px-5">
      <div className="max-w-md text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#D5560B] flex items-center justify-center text-4xl font-black">
          404
        </div>
        <h1 className="text-3xl font-black mb-3">Page Not Found</h1>
        <p className="text-white/70 mb-8 text-lg leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="rounded-full bg-[#D5560B] px-7 py-4 font-black text-white shadow-xl shadow-black/30"
          >
            Back to Home
          </Link>
          <Link
            to="/#quote"
            className="rounded-full border-2 border-white px-7 py-4 font-black text-white"
          >
            Request a Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
