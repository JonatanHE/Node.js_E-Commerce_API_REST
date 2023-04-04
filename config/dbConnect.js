const {default: mongoose } = require("mongoose")

// const dbConnect = () => {
//     try {
//         const conn = mongoose.connect(process.env.MONGODB_URL);
//         console.log("Base de Datos Conectada Exitosamente");
//     } catch (error) {
//         console.log("Error Base de Datos");
//     }
// };
// module.exports = dbConnect;

//const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Base de Datos Conectada Exitosamente");
  } catch (error) {
    console.log("Error Base de Datos", error);
  }
};

module.exports = dbConnect;
