import React from "react";

const SpinnerLoader = () => {
  return (
    <div role="status" className="flex items-center">
      <svg
        aria-hidden="true"
        className="w-5 h-5 animate-spin"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer ring */}
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="white"
          strokeWidth="3"
          opacity="0.25"
        />

        {/* Spinning arc */}
        <path
          d="M22 12a10 10 0 0 1-10 10"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default SpinnerLoader;
