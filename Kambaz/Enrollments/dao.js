// Kambaz/Enrollments/dao.js
import model from "./model.js";
import userModel from "../Users/model.js";   // << add this

export default function EnrollmentsDao(db) {
  // All enrollments (useful for /api/enrollments)
  async function findAllEnrollments() {
    return model.find();
  }

  // All courses a user is enrolled in
  async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId });
    return enrollments.map((enrollment) => enrollment.course);
  }

  // *** All users enrolled in a course ***
  async function findUsersForCourse(courseId) {
    // 1. Get enrollments for this course
    const enrollments = await model.find({ course: courseId });

    // 2. Extract user IDs
    const userIds = enrollments.map((e) => e.user);

    // 3. Fetch those users from the users collection
    const users = await userModel.find({ _id: { $in: userIds } });

    return users;
  }

  // Enroll a user in a course
  function enrollUserInCourse(userId, courseId) {
    return model.create({
      _id: `${userId}-${courseId}`,
      user: userId,
      course: courseId,
      status: "ENROLLED",
      enrollmentDate: new Date(),
    });
  }

  // Unenroll by (user, course) pair
  function unenrollUserFromCourse(userId, courseId) {
    return model.deleteOne({ user: userId, course: courseId });
  }

  // Unenroll by enrollmentId (_id)
  function unenrollUser(enrollmentId) {
    return model.deleteOne({ _id: enrollmentId });
  }

  // Remove all enrollments for a course
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
