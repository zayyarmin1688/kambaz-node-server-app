// Kambaz/Courses/dao.js
import model from "./model.js";

export default function CoursesDao(db) {

  function findAllCourses() {
    return model.find({}, { name: 1, description: 1 });
  }

  const createCourse = async (course) => {
    const newCourse = await model.create(course);
    return newCourse;
  };

  const deleteCourse = async (courseId) => {
    const status = await model.deleteOne({ _id: courseId });
    return status;
  };

  const updateCourse = async (courseId, courseUpdates) => {
    const status = await model.updateOne(
      { _id: courseId },
      { $set: courseUpdates }
    );
    return status;
  };

  return {
    findAllCourses,
    createCourse,
    deleteCourse,
    updateCourse,
  };
}

