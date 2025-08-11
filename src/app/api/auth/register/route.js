import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    if (!process.env.MONGO) {
      return new NextResponse("Server misconfigured: MONGO not set", { status: 500 });
    }

    await connect();

    const existing = await User.findOne({ $or: [{ email }, { name }] });
    if (existing) {
      return new NextResponse("User already exists", { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return new NextResponse("User has been created", { status: 201 });
  } catch (err) {
    console.error("Register error:", err);
    // Map duplicate key errors to 409
    if (err && err.code === 11000) {
      return new NextResponse("User already exists", { status: 409 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
