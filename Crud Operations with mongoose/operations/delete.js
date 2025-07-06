import { Fruit } from "../model/fruit.model.js";
import { User } from "../model/user.model.js";

const deleteFruit = async () => {
  try {
    const result = await Fruit.findOneAndDelete({ _id: "6867314de81682a02c20a6ff" }); 
    console.log("Fruit deleted :", result);
  } catch (error) {
    console.error(error.message);
  }
};


const deletePersons = async () => {
  try {
    const result = await User.deleteMany({ name: "Vinay" });
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
};


const deleteOperation = async() =>{
  // await deleteFruit();
  // await deletePersons();
}

export default deleteOperation