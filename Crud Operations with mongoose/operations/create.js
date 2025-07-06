import { Fruit } from "../model/fruit.model.js";
import { User } from "../model/user.model.js";

export const create = () => {
  const person1 = new User({
    name: "Vinay",
    age: 30,
  });

  // person1.save()
  // console.log("Data saved successfully");

  const kiwi = new Fruit({
    name: "Kiwi",
    price: 3.99,
  });

  const orange = new Fruit({
    name: "Orange",
    price: 1.99,
  });

  const banana = new Fruit({
    name: "Banana",
    price: 0.99,
  });

  // Fruit.insertMany([kiwi, orange, banana] )
  // console.log("Data saved successfully"); 
  
};

export default create;
