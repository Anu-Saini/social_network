const { Schema, model } = require('mongoose');
const moment = require('moment');
const Reaction = require('./Reaction')

// Schema to create thoughts
const ThoughtSchema = new Schema({
  thoughtText: {
   type: String,
   required: true,
   minlength: 1,
   maxlength: 280,
  },
   createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => 
      moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm: a'),
      // requirement of Using a getter method to format the timestamp on query
     },
    username: {
     type: String,
     required: true,
    },
     // * Array of nested documents created with the `reactionSchema`  
    reactions:[Reaction],
    },
    {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create a virtual property `reactionCount` that gets and sets the thaughts lenght
ThoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  })

// Initialize our Post model
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;