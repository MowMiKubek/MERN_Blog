import express from 'express';
import cors from 'cors'
// router
import postRouter from './routes/post.js';
import userRouter from './routes/user.js';
import apiRouter from './routes/api.js'
import path from 'path';

//! DO NOT DELETE, THIS IS DATABASE
import database from './database/db-mongoose.js'

const __dirname = path.resolve();
const app = express();
database()

console.log(__dirname)

app.use(express.static(path.join(__dirname, 'public')));

//encoders
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

// favicon
app.use('/favicon.ico', express.static('assets/favicon.ico'));

// routes
app.use('/posts', postRouter);
app.use('/users', userRouter);
app.use('/api', apiRouter);


export default app;