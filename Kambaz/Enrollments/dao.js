import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  function findAllEnrollments() {
    return db.enrollments;
  }

  function enrollUserInCourse(userId, courseId) {
    const enrollment = { _id: uuidv4(), user: userId, course: courseId };
    db.enrollments = [...db.enrollments, enrollment];
    return enrollment;
  }

  function unenrollUser(enrollmentId) {
    db.enrollments = db.enrollments.filter((e) => e._id !== enrollmentId);
  }

  return {
    findAllEnrollments,
    enrollUserInCourse,
    unenrollUser,
  };
}
