import mongoose from "mongoose";

let isConnected = false;

const connect = async () => {
  if (isConnected) return;
  try {
    if (!process.env.MONGO) {
      throw new Error("Missing MONGO env variable");
    }
    await mongoose.connect(process.env.MONGO);
    isConnected = true;
  } catch (error) {
    throw new Error("Connection failed!");
  }
};

export default connect;
