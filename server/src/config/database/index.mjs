import dotenv from 'dotenv';
dotenv.config();
import { connect } from 'mongoose';

async function connectDB() {
  try {
    connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@todolist.2upbpt5.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
      }
    );
    console.log('Connect sucessfully');
  } catch (error) {
    console.log('Connect failure' + error);
  }
}

export default connectDB;
