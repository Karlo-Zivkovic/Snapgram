import { FC } from "react";
import { useRouteError } from "react-router-dom";
import { AiOutlineExclamation } from "react-icons/ai";

const RouteError: FC = () => {
  const error: { error: { message: string } } = useRouteError() as {
    error: { message: string };
  };
  console.error(error);

  return (
    <div className="flex items-center -translate-y-20 justify-center h-screen">
      <div className="bg-stone-900 border border-gray-500 border-opacity-50 py-10 pl-6 pr-12 rounded-md text-white flex items-center space-x-4">
        <AiOutlineExclamation size={80} className="text-red-500 " />
        <div className="">
          <h1 className="text-2xl font-bold mb-4">Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>{error.error.message}</p>
        </div>
      </div>
    </div>
  );
};

export default RouteError;
