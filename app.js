require('dotenv').config()
const express = require('express');
const app = express();
const PORT = 5000;
const userRouter = require('./routers/userRouter');
const photoRouter = require('./routers/photoRouter');
const commentRouter = require('./routers/commentRouter');
const socialmediaRouter = require('./routers/socialmediaRouter');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(userRouter);
app.use(photoRouter);
app.use(commentRouter);
app.use(socialmediaRouter);

// app.listen(PORT, () => { console.log(`Server running on PORT ${PORT}`) });

module.exports = app;