import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import Question, { IQuestion, IChoice } from "../models/Question";
import connectDB from "../config/db";

const ASSETS_DIR = path.join(path.resolve(), "assets");

function prettify(name: string): string {
  return name
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function generateAlternatives(correct: string): string[] {
  const vowels = ["a", "e", "i", "o", "u"];
  const alts = new Set<string>();

  while (alts.size < 3) {
    let alt = correct
      .split(" ")
      .map((word) => {
        if (Math.random() < 0.5) {
          return word.replace(
            /[aeiou]/i,
            (m) => vowels[Math.floor(Math.random() * vowels.length)]
          );
        }
        return word;
      })
      .join(" ");
    if (alt !== correct) alts.add(alt);
  }

  return Array.from(alts);
}

async function seed(): Promise<void> {
  await connectDB();

  const files = fs.readdirSync(ASSETS_DIR).filter((f) => f.endsWith(".webp"));

  const questions: IQuestion[] = files.map((filename) => {
    const base = path.basename(filename, ".webp");
    const correct = prettify(base);
    const wrongs = generateAlternatives(correct);

    const choices: IChoice[] = [
      { text: correct, isCorrect: true },
      ...wrongs.map((w) => ({ text: w, isCorrect: false })),
    ].sort(() => Math.random() - 0.5);

    return {
      imageUrl: `/assets/${filename}`,
      text: "Quel est le nom de ce personnage ?",
      choices,
    } as IQuestion;
  });

  await Question.deleteMany({});
  const inserted = await Question.insertMany(questions);
  console.log(`${inserted.length} questions insérées !`);

  mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  mongoose.disconnect();
});
