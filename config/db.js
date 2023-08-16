import mongoose from 'mongoose';

const conectarDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.mongo_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Base de datos: ${connection.connection.name} conectada`);
    
  } catch (error) {
    console.log(error);
  }
};

export default conectarDB;