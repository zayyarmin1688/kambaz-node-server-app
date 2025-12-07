// Kambaz/Quizzes/routes.js
import QuizzesDao from "./dao.js";
import AttemptsRoutes from "./Attempts/routes.js";

export default function QuizzesRoutes(app, db) {
  const dao = QuizzesDao(db);

  const findQuizzesForCourse = async (req, res) => {
    const { courseId } = req.params;
    const quizzes = await dao.findQuizzesForCourse(courseId);
    res.json(quizzes);
  };

  const findQuizById = async (req, res) => {
    const { quizId } = req.params;
    const quiz = await dao.findQuizById(quizId);
    if (!quiz) {
      res.sendStatus(404);
      return;
    }
    res.json(quiz);
  };

  const createQuizForCourse = async (req, res) => {
    const { courseId } = req.params;
    const newQuiz = await dao.createQuiz(courseId, req.body);
    res.json(newQuiz);
  };

  const updateQuizById = async (req, res) => {
    const { quizId } = req.params;
    const result = await dao.updateQuiz(quizId, req.body);

    if (!result || result.matchedCount === 0) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  };

  const deleteQuizById = async (req, res) => {
    const { quizId } = req.params;
    await dao.deleteQuiz(quizId);
    res.sendStatus(204);
  };

  app.get("/api/courses/:courseId/quizzes", findQuizzesForCourse);
  app.post("/api/courses/:courseId/quizzes", createQuizForCourse);
  app.get("/api/quizzes/:quizId", findQuizById);
  app.put("/api/quizzes/:quizId", updateQuizById);
  app.delete("/api/quizzes/:quizId", deleteQuizById);

  AttemptsRoutes(app, db);
}
