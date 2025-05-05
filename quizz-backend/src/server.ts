import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import quizRoutes from "./routes/quiz";

dotenv.config({ path: ".env" });

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/assets", express.static("assets"));
app.get("/", (req: Request, res: Response) => {
  res.send("API en cours d'exécution");
});
app.use("/api/quiz", quizRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur port ${PORT}`));
