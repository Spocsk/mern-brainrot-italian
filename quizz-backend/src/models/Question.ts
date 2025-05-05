import mongoose, { Document, Schema } from "mongoose";

export interface IChoice {
  text: string;
  isCorrect: boolean;
}

export interface IQuestion extends Document {
  imageUrl: string;
  text: string;
  choices: IChoice[];
  createdAt?: Date;
  updatedAt?: Date;
}

const ChoiceSchema = new Schema<IChoice>({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
});

const QuestionSchema = new Schema<IQuestion>(
  {
    imageUrl: { type: String, required: true },
    text: { type: String, required: true },
    choices: {
      type: [ChoiceSchema],
      validate: {
        validator: (v: IChoice[]) => Array.isArray(v) && v.length === 4,
        message: "There must be exactly 4 choices.",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model<IQuestion>("Question", QuestionSchema);
