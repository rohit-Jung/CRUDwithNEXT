import { posts } from "@/app/util/db";
import { NextResponse } from "next/server";
import connectDB from "@/dbconfig/connect";
import { Post } from "@/models/post.model";
import { NextApiRequest } from "next";

//Connect to database
connectDB();

//GET route for getting all the posts
export async function GET() {
  const posts = await Post.find();

  if (!posts) {
    return NextResponse.json({ message: "No posts found" }, { status: 404 });
  }

  return NextResponse.json(posts, { status: 200 });
}

//POST route for adding a new post
export async function POST(req: Request) {
  let { userId, title, content } = await req.json();

  //Validate the data
  if (!userId || !title || !content) {
    return NextResponse.json(
      { message: "Required fields not provided" },
      { status: 400 }
    );
  } else {
    //Check for the post existence
    const postExists = await Post.exists({
      userId,
      title,
      content,
    });

    if (postExists) {
      return NextResponse.json({ message: "Post already exists", status: 200 });
    } else {
      //Create a new post
      const newPost = await Post.create({
        userId,
        title,
        content,
      });

      if (!newPost) {
        return NextResponse.json(
          { result: "Something went wrong while creating post" },
          { status: 400 }
        );
      }

      //Send the response
      return NextResponse.json(
        { message: "Post created successfully", PostDetails: newPost },
        { status: 201 }
      );
    }
  }
}
