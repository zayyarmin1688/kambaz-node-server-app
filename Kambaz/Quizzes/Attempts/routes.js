// Kambaz/Quizzes/Attempts/routes.js
import QuizAttemptsDao from "./dao.js";

export default function QuizAttemptsRoutes(app, db) {
  const dao = QuizAttemptsDao(db);

  app.get("/api/quizzes/:quizId/attempts/mine", async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }

    const { quizId } = req.params;

    const attempts = await dao.findAttemptsForUserAndQuiz(
      currentUser._id,
      quizId
    );

    res.json(attempts);
  });

  app.post("/api/quizzes/:quizId/attempts", async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }

    const { quizId } = req.params;
    const { answers, score, maxScore } = req.body;

    const existing = await dao.findAttemptsForUserAndQuiz(
      currentUser._id,
      quizId
    );

    const attemptNumber = (existing[0]?.attemptNumber ?? 0) + 1;

    const created = await dao.createAttempt({
      quizId,
      userId: currentUser._id,
      attemptNumber,
      answers,
      score,
      maxScore,
    });

    res.json(created);
  });
}
