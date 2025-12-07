// Kambaz/Quizzes/schema.js
import mongoose from "mongoose";

const choiceSchema = new mongoose.Schema(
  {
    _id: String,
    text: String,
    correct: Boolean,
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    _id: String,
    type: {
      type: String,
      enum: ["multiple-choice", "true-false", "fill-blank"],
      default: "multiple-choice",
    },
    title: String,
    points: Number,
    text: String,
    choices: [choiceSchema],      // for multiple-choice
    correctBoolean: Boolean,      // for true/false
    correctAnswers: [String],     // for fill-in-the-blank
  },
  { _id: false }
);

const schema = new mongoose.Schema(
  {
    _id: String,
    course: String,
    title: String,
    description: String,

    quizType: String,
    assignmentGroup: String,
    points: Number,

    shuffleAnswers: Boolean,
    timeLimitMinutes: Number,
    multipleAttempts: Boolean,
    maxAttempts: Number,
    showCorrectAnswers: String,
    accessCode: String,
    oneQuestionAtATime: Boolean,
    webcamRequired: Boolean,
    lockQuestionsAfterAnswering: Boolean,

    due: String,
    availableFrom: String,
    availableUntil: String,

    published: Boolean,

    // questions for this quiz
    questions: [questionSchema],
  },
  {
    collection: "quizzes",
    strict: false, // allow extra fields if needed
  }
);

export default schema;
