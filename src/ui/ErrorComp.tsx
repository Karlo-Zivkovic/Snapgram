import { FC } from "react";
import { AiOutlineExclamation } from "react-icons/ai";

interface ErrorCompProps {
  errorMsg: string;
}

const ErrorComp: FC<ErrorCompProps> = ({ errorMsg }) => {
  return (
    <div className="flex items-center -translate-y-40 justify-center h-screen">
      <div className="bg-stone-900 border border-gray-500 border-opacity-50  py-6 pl-6 pr-12 rounded-md text-white flex items-center space-x-4">
        <AiOutlineExclamation size={80} className="text-red-500 " />
        <div className="">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="mb-4">{errorMsg}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorComp;
