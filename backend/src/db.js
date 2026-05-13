import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/db_nodejs");

    console.log("MongoDB conectado exitosamente");
  } catch (error) {
    console.log("Error al conectar MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectMongoDB;