"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { MdLibraryAdd } from "react-icons/md";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 cursor-pointer  ">
        <Link
          href={"/"}
          className="flex items-center space-x-3 rtl:space-x-reverse "
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            JSON CRUD APP
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            className="flex items-center gap-3 text-md"
            onClick={() => router.push("/posts/addpost")}
          >
            Add Post
            <MdLibraryAdd className="text-2xl" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
