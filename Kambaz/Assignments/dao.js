// Kambaz/Assignments/dao.js
import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function AssignmentsDao(db) {
  async function findAssignmentsForCourse(courseId) {
    return model.find({ course: courseId });
  }

  async function findAssignmentById(assignmentId) {
    return model.findById(assignmentId);
  }

  async function createAssignment(courseId, assignment) {
    const newAssignment = {
      ...assignment,
      _id: uuidv4(),
      course: courseId,
    };
    return model.create(newAssignment);
  }

  async function updateAssignment(assignmentId, assignmentUpdates) {
    return model.updateOne(
      { _id: assignmentId },
      { $set: assignmentUpdates }
    );
  }

  async function deleteAssignment(assignmentId) {
    return model.deleteOne({ _id: assignmentId });
  }

  return {
    findAssignmentsForCourse,
    findAssignmentById,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  };
}
