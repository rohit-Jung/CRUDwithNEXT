"use client";
import Card from "@/components/Card";
import { useUpdateDataMutation } from "@/redux/apiSlice";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UpdatePostPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [updateData] = useUpdateDataMutation();
  const serachParams = useSearchParams();
  const router = useRouter();

  // Get initial values from URL parameters or set defaults
  const initialTitle = serachParams.get("title") || "";
  const initialContent = serachParams.get("content") || "";

  // Initialize state with initial values
  const [userId, setUserId] = useState<number>(0);
  const [title, setTitle] = useState<string>(initialTitle);
  const [content, setContent] = useState<string>(initialContent);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form fields
    if (!title || !content) {
      alert("Please fill in all required fields.");
      return;
    }

    // Create post data object
    const postData = {
      _id: id,
      userId,
      title,
      content,
    };

    try {
      // Dispatch the mutation to update data
      await updateData(postData);

      // Reset form fields after successful submission
      setUserId(0);
      setTitle("");
      setContent("");
      console.log("Data updated successfully");
      router.push("/");
    } catch (error) {
      console.error("Error updating data:", error);
      alert(
        "An error occurred while updating the data. Please try again later."
      );
    }
  };

  return (
    <>
      <Card
        userId={userId}
        title={title}
        content={content}
        onTitleChange={(value: string) => setTitle(value)}
        onContentChange={(value: string) => setContent(value)}
        onUserIdChange={(value: string) => setUserId(Number(value))} // Convert to number
        isEditMode={true} // Set to true for editing mode
        submitHandler={handleSubmit}
      />
    </>
  );
};

export default UpdatePostPage;
