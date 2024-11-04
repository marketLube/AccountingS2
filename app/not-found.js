// app/not-found.js
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-900">
      <div className="text-center px-6 py-8 bg-opacity-75 rounded-lg shadow-lg backdrop-blur-sm text-white">
        <h1 className="text-[8rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">
          404
        </h1>
        <h2 className="mt-4 text-4xl font-bold">Oops! Page Not Found</h2>
        <p className="mt-3 text-lg text-gray-200">
          It seems the page you&apos;re looking for doesn&apos;t exist or has
          been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
