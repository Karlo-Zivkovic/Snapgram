import { FC } from "react";
import Posts from "../features/posts/Posts";
import TopCreators from "../ui/TopCreators";

const Home: FC = () => {
  return (
    <>
      <div className="flex w-full justify-between md:ml-[3%]  text-slate-50  ">
        <div className="flex flex-col md:ml-[18%] w-full md:w-[40rem] ">
          <h1 className="gap-3 text-4xl text-slate-50 font-bold ">Home Feed</h1>
          <Posts />
        </div>
      </div>
      <TopCreators />
    </>
  );
};

export default Home;
