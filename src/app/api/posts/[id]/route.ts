import { NextResponse } from "next/server";
import { Post } from "@/models/post.model";
import connectDB from "@/dbconfig/connect";
import { NextApiRequest, NextApiResponse } from "next";

//interface for Response
interface Response {
  params: { id: string };
}

//Connect to database
connectDB();

//GET route to get sepecific post with id
export async function GET(req: Request, res: Response) {
  try {
    //Extract the id
    const { id } = res.params;
    // console.log(res);
    if (!id) {
      return NextResponse.json({ error: "Id not specified" }, { status: 400 });
    }

    //Find the post in database
    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

//DELETE route to delete a post
export async function DELETE(req: Request, res: Response) {
  try {
    //Extract the id
    const { id } = res.params;

    if (!id) {
      return NextResponse.json({ error: "Id not specified" }, { status: 400 });
    }

    //Find the post
    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json(
        { error: "Post with the id was not found" },
        { status: 404 }
      );
    }

    //Delete from database
    const deletePost = await Post.findByIdAndDelete(id);

    if (!deletePost) {
      return NextResponse.json(
        { error: "Error Deleting post" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { result: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

//PUT route to update a post
export async function PUT(req: Request, res: Response) {
  try {
    //Extract the id
    const { id } = res.params;

    //Extract the information
    const { title, content } = await req.json();
    // console.log(title, content)

    //validation
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title or content not specified" },
        { status: 400 }
      );
    }

    //Find the post
    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json(
        { error: "Post with the id was not found" },
        { status: 404 }
      );
    }

    //Find and Update the post
    const updatePost = await Post.findByIdAndUpdate(id, {
      title,
      content,
    });

    if (!updatePost) {
      return NextResponse.json(
        { error: "Error updating post" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { result: "Post updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { result: "Internal Server Error" },
      { status: 500 }
    );
  }
}
