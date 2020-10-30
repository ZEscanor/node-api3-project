const express = require('express');

const userRouter = require('./users/userRouter.js')
const postRouter = require("./posts/postRouter.js")
const server = express();

server.use(express.json())
server.use(userRouter);
server.use(postRouter);
server.use(logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(req.method," ",req.hostname, new Date());
  next()
}






module.exports = server;
