import { Fruit } from "../model/fruit.model.js";
import { User } from "../model/user.model.js";

const updateFruit = async () => {
  try {
    const result = await Fruit.updateOne(
      { _id: "68671cf5c9f61fac7feae1f5" }, 
      { name: "Watermelon" }              
    );
    console.log("Fruit updated:", result);
  } catch (error) {
    console.error( error.message);
  }
};


const updatePerson = async () => {
  try {
    const result = await User.updateOne(
      { name: "Vinay" },
      { age: 25 }
    );
    console.log("Person updated :", result);
  } catch (error) {
    console.error(error.message);
  }
};


const update = async() =>{
  // await updateFruit();
  // await updatePerson();
}

export default update