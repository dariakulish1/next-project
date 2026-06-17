import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/Post";
import { getAuthSession } from "@/utils/auth";

export const GET = async (request) => {
  const url = new URL(request.url);

  const username = url.searchParams.get("username");
  try {
    await connect();
    const posts = await Post.find(username && { name: username });
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const session = await getAuthSession();
  if (!session?.user?.name) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { title, img, content } = await request.json();

    if (!title || !img || !content) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    await connect();

    const newPost = new Post({
      title,
      img,
      content,
      name: session.user.name,
    });

    await newPost.save();

    return new NextResponse("Post has been created", { status: 201 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
