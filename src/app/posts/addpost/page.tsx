"use client";
import Card from "@/components/Card";
import { useAddDataMutation } from "@/redux/apiSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const [addData] = useAddDataMutation();
  const [userId, setUserId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Form validation: Check if required fields are filled
    if (!userId || !title || !content) {
      alert("Please fill in all required fields.");
      return;
    }

    const postData = {
      userId,
      title,
      content,
    };

    try {
      // Dispatch the mutation to add data
      await addData(postData);

      // Clear form fields after successful submission
      setUserId(0);
      setTitle("");
      setContent("");

      console.log("Data added successfully");

      //Push the user route to the homepage
      router.push('/');
    } catch (error) {
      console.error("Error adding data:", error);
      alert("An error occurred while adding the data. Please try again later.");
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
        onUserIdChange={(value: string) => setUserId(Number(value))}
        isEditMode={false}
        submitHandler={handleSubmit}
      />
    </>
  );
};

export default Page;
