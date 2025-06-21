import mongoose from "mongoose";

export const connectMongoDb = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI || "");
      console.log("MongoDB холбогдлоо");
    }
  } catch (error) {
    console.error("MongoDB холбогдож чадсангүй:", error);
  }
};
 