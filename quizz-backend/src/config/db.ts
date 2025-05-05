import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    await mongoose.connect(mongoUri);
    console.log("MongoDB connecté");
  } catch (err) {
    if (err instanceof Error) {
      console.error("Erreur connexion MongoDB:", err.message);
    } else {
      console.error("Erreur connexion MongoDB:", err);
    }
    process.exit(1);
  }
};

export default connectDB;
