import express from "express";
import Question from "../models/Question";

const router = express.Router();

router.get("/questions/:count", async (req, res) => {
  try {
    const count = parseInt(req.params.count, 10);
    const questions = await Question.aggregate([
      { $sample: { size: count } },
      { $project: { imageUrl: 1, text: 1, choices: 1, _id: 0 } },
    ]);
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;
