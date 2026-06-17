import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/Post";
import { getAuthSession } from "@/utils/auth";

export const GET = async (request, { params }) => {
  const { id } = await params;

  try {
    await connect();
    const post = await Post.findById(id);
    if (!post) {
      return new NextResponse("Post not found", { status: 404 });
    }
    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.error("Database connection error:", err);
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const session = await getAuthSession();
  if (!session?.user?.name) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;

  try {
    await connect();
    const post = await Post.findById(id);
    if (!post) {
      return new NextResponse("Post not found", { status: 404 });
    }
    if (post.name !== session.user.name) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    await Post.findByIdAndDelete(id);
    return new NextResponse("Post has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
