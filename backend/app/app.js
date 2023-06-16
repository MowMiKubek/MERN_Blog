import express from 'express';
// router
import postRouter from './routes/post.js';
import userRouter from './routes/user.js';
import apiRouter from './routes/api.js';
import path from 'path';

// middleware
import Post from './database/db-mongoose.js';
import config from './config.js';

const __dirname = path.resolve();
const app = express();

console.log(__dirname)

app.use(express.static(path.join(__dirname, 'public')));

//encoders
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// favicon
app.use('/favicon.ico', express.static('assets/favicon.ico'));

// routes
app.use('/posts', postRouter);
app.use('/users', userRouter);
// app.use('/api', apiRouter);
// app.use('/', webRouter); //! contains default route


export default app;