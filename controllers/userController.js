const { User } = require('../models');

//get request for all users
const userController = {
 getUsers(req,res) {
  User.find({})
  .populate({
   path:'thoughts',
   select: '-__v',
  })
  
  .populate({
   path:'friends',
   select: '-__v',
 })
.select('-__v')
.sort({ _id: -1 })
.then((dbUserData) => res.json(dbUserData))
.catch((err)=> {
 res.status(400).json(err);
});
}, 

 getOneUsers({ params} , res) {
  User.findOne({ _id: params.id})
  .populate({
   path:'thoughts',
   select: '-__v',
  })
   .populate({
   path:'friends',
   select: '-__v',
 })
.select('-__v')
.then((dbUserData) => {
 if(!dbUserData) {
  res.status(400).json({message: 'user not available'})
 return;
}
res.json(dbUserData);
 })
.catch((err)=> {
 res.status(400).json(err);
});
},


//create a new user
createUser({ body },res) {
 User.create(body)
 .then((dbUserData)=> res.json(dbUserData))
 .catch((err) => res.status(400).json(err));
},

//updating an existing user
updateUser({ params, body }, res) {
 User.findOneAndUpdate({ _id: params.id }, body , {
  new:true,
 })
 .then((dbUserData) => {
  if(!dbUserData) {
   res.status(400).json({message: 'no user available'})
return;
  }
 res.json(dbUserData)
})
 .catch((err) => res.status(400).json(err));
},

// creating a friend for user
createFriend({ params }, res) {
 User.findOneAndUpdate(
  { _id: params.id},
  { $push: { friends: params.friendId }},
  { new: true }
 ).populate({
  path: 'friends',
  select: '-__v',
 })
 .select('-__v')
 .then((dbUserData) => {
  if(!dbUserData) {
   res.status(400).json({message: 'user not available'});
   return;
 }
 res.json(dbUserData);
 })
 .catch((err) => res.json(err));
},


//deleting user
deleteUser({ params }, res) {
 User.findOneAndDelete(
  { _id: params.id})
  .then((dbUserData) => {
   if(!dbUserData) {
    res.status(400).json({message: 'user not available'})
    return;
   }
   res.json(dbUserData);
  })
  .catch((err) => res.status(400).json(err));
 },

// deleting a friend for a user
deleteFriend({ params }, res) {
 User.findOneAndUpdate(
  { _id: params.id},
  { $pull: { friends: params.friendId }},
  { new: true }
 ).populate({
  path: 'friends',
  select: '-__v',
 })
 .select('-__v')
 .then((dbUserData) => {
  if(!dbUserData) {
   res.status(400).json({message: 'user not available'});
   return;
 }
 res.json(dbUserData);
 })
 .catch((err) => res.status(400).json(err));
},
};

module.exports = userController

