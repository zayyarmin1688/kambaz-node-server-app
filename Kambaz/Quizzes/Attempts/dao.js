// Kambaz/Quizzes/Attempts/dao.js
import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function QuizAttemptsDao(db) {
  async function findAttemptsForUserAndQuiz(userId, quizId) {
    return model
      .find({ userId, quizId })
      .sort({ attemptNumber: -1, submittedAt: -1 });
  }

  async function createAttempt(attempt) {
    const doc = {
      ...attempt,
      _id: uuidv4(),
      submittedAt: new Date(),
    };
    return model.create(doc);
  }

  return {
    findAttemptsForUserAndQuiz,
    createAttempt,
  };
}
