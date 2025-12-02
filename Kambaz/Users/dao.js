// Kambaz/Users/dao.js
import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function UsersDao(db) {
  const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    return model.create(newUser);
  };

  const findAllUsers = () => model.find();
  const findUserById = (id) => model.findById(id);
  const findUserByUsername = (username) =>
    model.findOne({ username });
  const findUserByCredentials = (username, password) =>
    model.findOne({ username, password });

  const findUsersByRole = (role) =>
    model.find({ role: role });

  const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i");
    return model.find({
      $or: [
        { firstName: { $regex: regex } },
        { lastName: { $regex: regex } },
      ],
    });
  };

  const deleteUser = (userId) => model.findByIdAndDelete(userId);

  const updateUser = (userId, user) =>
    model.updateOne({ _id: userId }, { $set: user });

  return {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    findUsersByRole,
    findUsersByPartialName,
    updateUser,
    deleteUser,
  };
}
