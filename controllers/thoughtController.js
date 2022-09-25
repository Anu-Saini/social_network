const { Thought, User } = require('../models');

//get request for users thoughts
const thoughtController = {
 getAllThoughts(req,res) {
  Thought.find({})
  .sort({ _id: -1})
  .then((dbThoughtData) => res.json(dbThoughtData))
  .catch((err)=> {
    res.status(400).json(err);
  });
},

//get request for individual thought
 getOneThought({ params} , res) {
  Thought.findOne({ _id: params.id})
  .populate({
   path:'reactions',
   select: '-__v',
  })
  .select('-__v')
.then((dbThoughtData) => {
 if(!dbThoughtData) {
  res.status(400).json({message: 'thought not found '})
 return;
}
res.json(dbThoughtData);
 })
.catch((err)=> {
 res.status(400).json(err);
});
},


//create a new thought
createThought({ params, body },res) {
 Thought.create(body)
 .then (({ _id }) => {
  return User.findOneAndUpdate(
    { _id : params.userId},
    { $push: { thoughts: _id }},
    { new: true }
  );
 })
 .then((dbThoughtData) => {
  if(!dbThoughtData) {
   res.status(400).json({message: 'no thoughts available for display'})
return;
  }
 res.json(dbThoughtData)
})
 .catch((err) => res.status(400).json(err));
},
 
 
//updating an existing thought
updateThought({ params, body }, res) {
Thought.findOneAndUpdate({ _id: params.id }, body , {
  new:true,
 })
 .populate({
  path:'reactions',
  select: '-__v',
 })
 .select('-__v')
 .then((dbThoughtData) => {
  if(!dbThoughtData) {
   res.status(400).json({message: 'no user available'})
return;
  }
 res.json(dbThoughtData)
})
 .catch((err) => res.status(400).json(err));
},

//deleting a thought
deleteThought({ params }, res) {
  Thought.findOneAndDelete(
   { _id: params.id})
   .then((dbThoughtData) => {
    if(!dbThoughtData) {
     res.status(400).json({message: 'thoughts not available'})
     return;
    }
    res.json(dbThoughtData);
   })
   .catch((err) => res.status(400).json(err));
  },
 


// creating a reaction response for a user thought 
createReaction({ params, body }, res) {
 Thought.findOneAndUpdate(
  { _id: params.thoughtId},
  { $push: { reactions: body }},
  { new: true }
 ).populate({
  path: 'reactions',
  select: '-__v',
 })
 .select('-__v')
 .then((dbThoughtData) => {
  if(!dbThoughtData) {
   res.status(400).json({message: 'thoughts not available'});
   return;
 }
 res.json(dbThoughtData);
 })
 .catch((err) => res.json(err));
},



// deleting a reaction on a thought
deleteReaction({ params }, res) {
 Thought.findOneAndUpdate(
  { _id: params.thoughtId},
  { $pull: { reactions:{ reactionId: params.reactionId}}},
  { new: true }
 )
 .then((dbThoughtData) => {
  if(!dbThoughtData) {
   res.status(400).json({message: 'thoughts not available'});
   return;
 }
 res.json(dbThoughtData);
 })
 .catch((err) => res.status(400).json(err));
},
};

module.exports = thoughtController;