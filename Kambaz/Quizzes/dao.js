// Kambaz/Quizzes/dao.js
import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function QuizzesDao(db) {
  async function findQuizzesForCourse(courseId) {
    return model.find({ course: courseId });
  }

  async function findQuizById(quizId) {
    return model.findById(quizId);
  }

  async function createQuiz(courseId, quiz) {
    const newQuiz = {
      ...quiz,
      _id: uuidv4(),
      course: courseId,
    };
    return model.create(newQuiz);
  }

  async function updateQuiz(quizId, quizUpdates) {
    return model.updateOne({ _id: quizId }, { $set: quizUpdates });
  }

  async function deleteQuiz(quizId) {
    return model.deleteOne({ _id: quizId });
  }

  return {
    findQuizzesForCourse,
    findQuizById,
    createQuiz,
    updateQuiz,
    deleteQuiz,
  };
}
