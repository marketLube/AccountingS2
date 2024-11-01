// components/FullPageLoader.js
export default function FullPageLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="flex items-center space-x-2 text-white">
        <svg
          className="w-12 h-12 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM2 12a10 10 0 0110-10v4a6 6 0 00-6 6H2z"
          ></path>
        </svg>
        <span className="text-lg font-semibold">Loading...</span>
      </div>
    </div>
  );
}
