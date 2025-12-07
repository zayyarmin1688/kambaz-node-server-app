// Kambaz/Quizzes/Attempts/schema.js
import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    questionId: String,
    selectedOptionIds: [String],
    textAnswer: String,
  },
  { _id: false }
);

const schema = new mongoose.Schema(
  {
    _id: String,
    quizId: String,
    userId: String,

    attemptNumber: Number,

    submittedAt: { type: Date, default: Date.now },

    score: { type: Number, default: 0 },
    maxScore: { type: Number, default: 0 },

    answers: {
      type: [answerSchema],
      default: [],
    },
  },
  {
    collection: "quiz_attempts",
    strict: false,
  }
);

export default schema;
