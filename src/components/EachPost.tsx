"use client";
import React from "react";
import { useDeleteDataMutation } from "@/redux/apiSlice";
import { Post } from "@/types/Post";
import Link from "next/link";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBinFill } from "react-icons/ri";

const EachPost = ({ post }: { post: Post }) => {
  const [deletePost] = useDeleteDataMutation();

  const deleteHandler = async () => {
    const confirmed = confirm("Are you sure you want to delete this post?");

    if (!confirmed) {
      return;
    }

    try {
      await deletePost(post);
      console.log("Data deleted successfully");
    } catch (error) {
      console.error("Error deleting data:", error);
      alert(
        "An error occurred while deleting the data. Please try again later."
      );
    }
  };

  return (
    <div className="bg-gray-800 text-white rounded-lg flex items-center justify-between px-10 py-8 w-[80vw] sm:flex-row flex-col">
      <div className="w-[60%] overflow-hidden">
        <h1 className="text-4xl font-bold capitalize">{post.title}</h1>
        <p className="capitalize mt-2">{post.content}</p>
        <p className="text-xs">User Id: {post.userId}</p>
      </div>
      <div className="flex sm:gap-5 gap-10 sm:mt-0 mt-8 items-center">
        <button
          onClick={deleteHandler}
          className="bg-red-500  rounded-lg p-3 text-2xl hover:bg-red-800"
        >
          <RiDeleteBinFill />
        </button>
        <Link
          href={{
            pathname: `/posts/editpost/${post._id}`,
            query: {
              title: post.title,
              content: post.content,
            },
          }}
          className="bg-blue-500 rounded-lg p-3 text-2xl hover:bg-blue-800"
        >
          <AiFillEdit />
        </Link>
      </div>
    </div>
  );
};

export default EachPost;
