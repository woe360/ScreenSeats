import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const options = {
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      },
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    const uri = "mongodb+srv://jonasandriuskevicius13:YY74SSbPa2EVgcNq@cluster0.jtt2i.mongodb.net/screenseats?retryWrites=true&w=majority&appName=Cluster0";
    
    const conn = await mongoose.connect(uri, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    if (error.code) console.error(`Error Code: ${error.code}`);
    if (error.syscall) console.error(`System Call: ${error.syscall}`);
    if (error.hostname) console.error(`Hostname: ${error.hostname}`);
    process.exit(1);
  }
};

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

export default connectDB; 