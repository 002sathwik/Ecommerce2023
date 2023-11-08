import mongoose from "mongoose";
 import colors from "colors";

// connect db function----------------------------------------------------//
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to MongoDB`.bgYellow.yellow);
  } catch (error) {
    console.error(`Error : ${error.message}`.bgRed);
  }
};
export default connectDB; // Exporting  function 
