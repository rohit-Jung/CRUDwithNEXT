"use client";
import Card from "@/components/Card";
import EachPost from "@/components/EachPost";
import { useGetDatasQuery } from "@/redux/apiSlice";
import { Post } from "@/types/Post";

export default function Home() {
  const { isLoading, isSuccess, isError, data, error } = useGetDatasQuery();

  return (
    <main className="flex min-h-screen w-full flex-col items-center gap-5 p-24">
      {isLoading ? (
        <div className="text-2xl font-semibold w-full h-[60vh] flex items-center justify-center dark:text-slate-200 text-black">
          Loading ....
        </div>
      ) : isSuccess ? (
        data && data.length > 0 ? (
          data.map((post: Post) => (
            <div key={post._id}>
              <EachPost post={post} />
            </div>
          ))
        ) : (
          <div className="text-2xl font-semibold w-full h-[60vh] flex items-center justify-center dark:text-slate-200 text-black">
            No Posts to show
          </div>
        )
      ) : isError ? (
        <p>Error</p>
      ) : null}
    </main>
  );
}
