import mongoose from 'mongoose';
import Post from './models/post.js'
import config from '../config.js';

const {dbURL} = config;

const connectDB = async () => {
    try {
            await mongoose.connect(dbURL);
            console.log('MongoDB Connected...');
        } catch (error) {
            console.log(error.message);
            process.exit(1);
        }
}

connectDB();

export default Post;