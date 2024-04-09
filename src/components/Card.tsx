"use client";
import React from "react";
import { Post } from "@/types/Post";

interface AddEditProps extends Partial<Post> {
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onUserIdChange?: (value: string) => void;
  isEditMode: boolean;
  submitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Card: React.FC<AddEditProps> = ({
  userId,
  title,
  content,
  onTitleChange,
  onContentChange,
  onUserIdChange,
  isEditMode,
  submitHandler,
}: AddEditProps) => {
  return (
    <>
      <div className="h-screen flex justify-center items-center ">
        <div className="relative p-4 bg-white w-full max-w-2xl md:h-auto rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {isEditMode ? "Update Post" : "Add New Post"}
            </h3>
          </div>
          <form onSubmit={submitHandler} className="w-full">
            <div className="grid gap-4 mb-4 sm:grid-cols-2 col-span-full">
              <div>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={title}
                  placeholder="Enter the title of the post"
                  onChange={(e) => onTitleChange(e.target.value)}
                />
              </div>
              {!isEditMode && onUserIdChange && (
                <div>
                  <label htmlFor="userId">UserId</label>
                  <input
                    type="text"
                    name="userId"
                    id="userId"
                    value={userId}
                    placeholder="Enter your userId"
                    onChange={(e) => onUserIdChange(e.target.value)}
                  />
                </div>
              )}
              <div className="sm:col-span-2">
                <label htmlFor="content">About Post</label>
                <textarea
                  id="content"
                  name="content"
                  rows={8}
                  value={content}
                  placeholder="Write the content of post..."
                  onChange={(e) => onContentChange(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center py-3">
              <button type="submit" className="btn">
                {isEditMode ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Card;
