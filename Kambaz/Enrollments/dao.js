// Kambaz/Enrollments/dao.js
import model from "./model.js";
import userModel from "../Users/model.js";

export default function EnrollmentsDao(db) {
  async function findAllEnrollments() {
    return model.find();
  }

  async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId });
    return enrollments.map((enrollment) => enrollment.course);
  }

  async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId });

    const userIds = enrollments.map((e) => e.user);

    const users = await userModel.find({ _id: { $in: userIds } });

    return users;
  }

  function enrollUserInCourse(userId, courseId) {
    return model.create({
      _id: `${userId}-${courseId}`,
      user: userId,
      course: courseId,
      status: "ENROLLED",
      enrollmentDate: new Date(),
    });
  }

  function unenrollUserFromCourse(userId, courseId) {
    return model.deleteOne({ user: userId, course: courseId });
  }

  function unenrollUser(enrollmentId) {
    return model.deleteOne({ _id: enrollmentId });
  }

  function unenrollAllUsersFromCourse(courseId) {
    return model.deleteMany({ course: courseId });
  }

  return {
    findAllEnrollments,
    findCoursesForUser,
    findUsersForCourse,
    enrollUserInCourse,
    unenrollUserFromCourse,
    unenrollAllUsersFromCourse,
    unenrollUser,
  };
}
