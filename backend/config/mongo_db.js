import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    console.log("Connecting to MongoDB database".cyan.underline);

    const MONGO_URI =
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI_SERVER
        : process.env.MONGO_URI_SERVER;

    mongoose.set("strictQuery", false);

    const conn = await mongoose.connect(MONGO_URI);

    console.log(
      `MongoDB connection successful: ${conn.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectToMongoDB;
