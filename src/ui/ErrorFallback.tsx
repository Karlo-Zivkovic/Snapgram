import { FC } from "react";
import { AiOutlineExclamation } from "react-icons/ai";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-stone-900 border border-gray-500 border-opacity-50  py-6 pl-6 pr-12 rounded-md text-white flex items-center space-x-4">
        <AiOutlineExclamation size={80} className="text-red-500 " />
        <div className="">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="mb-4">{error.message}</p>
          <div className="pt-2 flex justify-end">
            <button
              className="bg-white translate-x-4 hover:bg-slate-300 text-stone-900 px-4 py-2 rounded-md"
              onClick={resetErrorBoundary}
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
