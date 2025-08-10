import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Contact from "@/models/Contact";

export const POST = async (request) => {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return new NextResponse("Missing required fields", {
        status: 400,
      });
    }

    await connect();

    const contactInfo = new Contact({
      name,
      email,
      message,
    });

    await contactInfo.save();
    
    return new NextResponse("The message has been sent", {
      status: 201,
    });
  } catch (err) {
    console.error("Contact submission error:", err);
    return new NextResponse("Something went wrong", {
      status: 500,
    });
  }
};
