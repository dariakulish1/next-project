import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { name, email, password } = await request.json();

    const normalizedName = name?.trim();
    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedName || !normalizedEmail || !password) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    if (!process.env.MONGO) {
      return new NextResponse("Server misconfigured: MONGO not set", { status: 500 });
    }

    await connect();

    const existingEmail = await User.findOne({ email: normalizedEmail });
    if (existingEmail) {
      return new NextResponse("This email is already registered. Please log in instead.", { status: 409 });
    }

    const existingName = await User.findOne({ name: normalizedName });
    if (existingName) {
      return new NextResponse("This username is already taken. Please choose another one.", { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: normalizedName,
      email: normalizedEmail,
      password: hashedPassword,
    });

    await newUser.save();
    return new NextResponse("User has been created", { status: 201 });
  } catch (err) {
    console.error("Register error:", err);
    // Map duplicate key errors to 409
    if (err && err.code === 11000) {
      const field = Object.keys(err.keyPattern || {})[0];
      if (field === "email") {
        return new NextResponse("This email is already registered. Please log in instead.", { status: 409 });
      }
      if (field === "name") {
        return new NextResponse("This username is already taken. Please choose another one.", { status: 409 });
      }
      return new NextResponse("User already exists", { status: 409 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
