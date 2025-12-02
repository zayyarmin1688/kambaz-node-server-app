// Kambaz/Assignments/schema.js
import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    _id: String,
    course: String,
    title: String,
    description: String,
    dueDate: Date,
    points: Number,
  },
  {
    collection: "assignments",
    strict: false,
  }
);

export default schema;
