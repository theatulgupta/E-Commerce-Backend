import { database } from '../config.js';
import mongoose from 'mongoose';

const dbUri = database.connectionUri;
const dbName = database.name;

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${dbUri}/${dbName}`);
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED: ", error);
        process.exit(1);
    }
}

export default connectDB;