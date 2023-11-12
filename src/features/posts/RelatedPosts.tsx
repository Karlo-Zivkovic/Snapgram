import { FC } from "react";
import { useGetRelatedPosts } from "./queryHooks/useGetRelatedPosts";
import Loader from "../../ui/Loader";
import RelatedPost from "./RelatedPost";
import ErrorComp from "../../ui/ErrorComp";

interface RelatedPostsProps {
  post: {
    id: number;
    tags: string;
  };
}

const RelatedPosts: FC<RelatedPostsProps> = ({ post }) => {
  const { relatedPosts, isLoadingRelatedPosts, relatedPostsError } =
    useGetRelatedPosts({
      postId: post?.id,
      tags: post?.tags || "",
    });
  console.log(relatedPosts?.length);

  return (
    <div className="flex flex-col gap-12 border-t border-t-gray-500 border-opacity-30 pt-10 pb-[8rem]">
      <h1 className="text-2xl font-bold ">More Related Posts</h1>
      {relatedPostsError && (
        <div className="-translate-y-[10rem]">
          <ErrorComp errorMsg="Could not fetch related posts." />
        </div>
      )}
      {isLoadingRelatedPosts ? (
        <Loader size="medium" />
      ) : relatedPosts?.length ? (
        <ul className="flex w-full gap-8 flex-wrap pb-24 sm:grid sm:grid-cols-2 xl:grid-cols-3">
          {relatedPosts?.map((relatedPost) => (
            <RelatedPost key={relatedPost.id} relatedPost={relatedPost} />
          ))}
        </ul>
      ) : undefined}
      {!relatedPosts?.length && !isLoadingRelatedPosts && (
        <p className="text-violet-400 opacity-60 text-center">
          No related posts
        </p>
      )}
    </div>
  );
};

export default RelatedPosts;
