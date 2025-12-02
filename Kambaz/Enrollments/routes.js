// Kambaz/Enrollments/routes.js
import EnrollmentsDao from "./dao.js";


export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const findAllEnrollments = async (req, res) => {
    const enrollments = await dao.findAllEnrollments();
    res.json(enrollments);
  };

  const enrollInCourse = async (req, res) => {
    const { user, course } = req.body;

    if (!user || !course) {
      res.status(400).json({ message: "user and course are required" });
      return;
    }

    const enrollment = await dao.enrollUserInCourse(user, course);
    res.json(enrollment);
  };
  const findUsersForCourseRoute = async (req, res) => {
    const { cid } = req.params;
    const users = await dao.findUsersForCourse(cid);
    res.json(users);
  };

  const unenrollFromCourse = async (req, res) => {
    const { enrollmentId } = req.params;
    await dao.unenrollUser(enrollmentId);
    res.sendStatus(200);
  };

  app.get("/api/enrollments", findAllEnrollments);
  app.post("/api/enrollments", enrollInCourse);
  app.delete("/api/enrollments/:enrollmentId", unenrollFromCourse);
  app.get("/api/courses/:cid/users", findUsersForCourseRoute);
}


