import mongoose from "mongoose";

let isConnected = false;
export const connectDb = async () => {
  try {
    if (isConnected) {
      console.log("Mongodb is already connected");
      return;
    }
    await mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: "todo-application",
    });
    console.log("Connected to mongodb");
    isConnected = true;
  } catch (error) {
    console.log("Error connecting to mongodb", error);
  }
};
