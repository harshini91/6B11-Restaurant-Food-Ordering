const mongoose = require('mongoose');

const uri = "mongodb+srv://mern:mernfoodapp@cluster0.g0oa3ua.mongodb.net/food_data?retryWrites=true&w=majority&appName=Cluster0";
const mongoDB = async () => {
  try {
    await mongoose.connect(uri, { autoIndex: true, serverSelectionTimeoutMS: 60000 });
    console.log('Connected to MongoDB Atlas');
    const fetched_data = await mongoose.connection.db.collection("food_items");

    try {
      const data = await fetched_data.find({}).toArray();
      const foodCategory = await mongoose.connection.db.collection("food_category");
      try {
        const catData = await foodCategory.find({}).toArray();
        global.food_items = data;
        global.foodCategory = catData;

      } catch (error) {
        console.error(error);
      }
      // global.food_items = data;
      // console.log(global.food_items);
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = mongoDB;