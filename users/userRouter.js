
const express = require('express');
const User = require('./userDb.js');
const Post = require('../posts/postDb')
const {use} = require("../posts/postRouter");
const { getUserPosts } = require('./userDb.js');



const router = express.Router();

router.post('/api/users',[validateUser],(req, res) => {
  // do your magic!
  User.insert(req.body)
  .then(data=>{
    res.status(201).json({sucessmessage:`sucessfully inserted ${data}`})
  })
  .catch(error=>{
    res.status(401).json({message:"hmmmm"})
  })
});

router.post('/api/users/:id/posts',[validateUserId,validatePost] ,(req, res) => {
  // do your magic!
  const aPost = {
    user_id : req.user.id,
    text: req.body.text,
  };
  Post.insert(aPost)
  .then(data=>{
    res.status(200).json(data)
  })
  .catch(error=>{
    res.status(401).json({message:"hmmmm"})
  })
});

router.get('/api/users', (req, res) => {
  // do your magic!
  User.get()
  .then((user)=>{
    res.status(200).json(user);
  })
  .catch((error)=>{
    console.log(error)
    res.status(500).json({errorMessage:"NO such user"})
  })
});

router.get('/api/users/:id',[validateUserId],(req, res) => {
 res.status(201).json(req.user)
});

router.get('/api/users/:id/posts',[validateUserId], (req, res) => {
  // do your magic!
  User.getUserPosts(req.user.id)
  .then((data)=>{
    res.status(200).json(data)
})
  .catch((error)=>{
    console.log(error)
    res.status(500).json({errorMessage:"NO such user"})
  })
  
});

router.delete('/api/users/:id',[validateUserId], (req, res) => {
  // do your magic!
  User.remove(req.user.id)
  .then(data=>{
    res.status(201).json({Message:`successfully deleted ${data}`})
  })
  .catch(error=>{
    res.status(400).json({errorMessage:"not found"})
  })

});

router.put('/api/users/:id',[validateUserId, validateUser], (req, res) => {
  // do your magic!
  User.update(req.user.id,req.body)
  .then(
    res.status(200).json({message:"success"})
  )
  .catch(error=>{
    res.status(400).json({errorMessage:"not found"})
  })
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  User.getById(id)

  .then(data=>{
    if(data){
    req.user = data
    next()
    }
    else{
      res.status(404).json({errorMessage:"no hub with id"+ id})
    }
  })
  .catch(error=>{
    console.log(error.message)
  })
}

function validateUser(req, res, next) {
  // do your magic!
  if(!req.body || !req.body.name){
    res.status(401).json({message:"Missing some key elements NAME"})
  }
  else{
    next()
  }

}

function validatePost(req, res, next) {
  // do your magic!
  if(!req.body || !req.body.post){
    res.status(401).json({message:"Missing some key elements NAME"})
}
else{
  next()
}
}
module.exports = router;
