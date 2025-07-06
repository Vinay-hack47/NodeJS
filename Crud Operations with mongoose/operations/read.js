import { User } from "../model/user.model.js";

const readAll = async () => {
  try {
    const users = await User.find();
    console.log("All users:", users);
  } catch (error) {
    console.error( error.message);
  }
};

const readOne = async () => {
  try {
    const user = await User.findOne({ name: "Vinay" });
    if (user) {
      console.log("One user with name Vinay:", user);
    } else {
      console.log("No user found with name Vinay");
    }
  } catch (error) {
    console.error( error.message);
  }
};

const read = async () => {
  // await readAll();
  // await readOne();
};

export default read;
