import { FC } from "react";
import useTopCreators from "../hooks/useTopCreators";
import TopUser from "./TopUser";
import Loader from "./Loader";
import ErrorComp from "./ErrorComp";

const TopCreators: FC = () => {
  const { topUsers, isLoading, error } = useTopCreators();

  return (
    <div className="text-slate-50 pt-10 -translate-y-16 hidden xl:block 2xl:w-[25%] xl:w-[20%] px-7 pb-10 h-screen fixed right-0 border-l border-l-gray-800 ">
      <h1 className="font-bold text-2xl">Top creators</h1>
      {error && (
        <ErrorComp errorMsg="Could not fetch top users, please try again later." />
      )}
      {isLoading ? (
        <div className="mt-10">
          <Loader size="medium" />
        </div>
      ) : (
        <ul className="mt-10 flex flex-wrap gap-7">
          {topUsers.map((topUser) => (
            <TopUser topUser={topUser} key={topUser.id} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopCreators;
