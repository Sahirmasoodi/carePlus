import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({
  code = "404",
  title = "Oops! Something went wrong",
  message = "We couldn’t find the page you’re looking for.",
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EFF4FE] px-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-100 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-100 rounded-full blur-2xl"></div>

        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-3xl font-bold shadow-md">
            🏥
          </div>
        </div>

        <h1 className="text-6xl font-extrabold text-gray-800 text-center tracking-wide">
          {code}
        </h1>

        <h2 className="mt-3 text-xl font-semibold text-gray-700 text-center">
          {title}
        </h2>

        <p className="mt-2 text-gray-500 text-sm text-center leading-relaxed">
          {message}
        </p>

        <div className="my-6 border-t border-gray-200"></div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition font-medium"
          >
            ← Go Back
          </button>
        </div>

        <p className="mt-6 text-xs text-gray-400 text-center">
          If the problem persists, please contact system administrator.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
