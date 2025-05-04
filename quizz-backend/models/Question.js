import mongoose from 'mongoose';

const ChoiceSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true }
});

const QuestionSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  text: { type: String, required: true },
  choices: { type: [ChoiceSchema], validate: v => Array.isArray(v) && v.length === 4 }
}, { timestamps: true });

export default mongoose.model('Question', QuestionSchema);
