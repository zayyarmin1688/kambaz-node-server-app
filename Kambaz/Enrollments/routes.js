import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const findAllEnrollments = (req, res) => {
    res.json(dao.findAllEnrollments());
  };

  const enrollInCourse = (req, res) => {
    const { user, course } = req.body;
    if (!user || !course) {
      res.status(400).json({ message: "user and course are required" });
      return;
    }
    const enrollment = dao.enrollUserInCourse(user, course);
    res.json(enrollment);
  };

  const unenrollFromCourse = (req, res) => {
    const { enrollmentId } = req.params;
    dao.unenrollUser(enrollmentId);
    res.sendStatus(200);
  };

  app.get("/api/enrollments", findAllEnrollments);
  app.post("/api/enrollments", enrollInCourse);
  app.delete("/api/enrollments/:enrollmentId", unenrollFromCourse);
}

