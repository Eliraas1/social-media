import { connect } from "mongoose";

export const connectToDB = async () => {
  try {
    await connect(process.env.MONGO_URI as string);
    console.log("Connected to mongoDB");
  } catch (e: any) {
    console.log("an error occurred while connecting to Mongo: ", e.message);
    process.exit(1);
  }
};
