const { Schema, model } = require('mongoose');
const moment = require('moment');

// Schema to create Reaction model
const ReactionSchema = new Schema(
  {
   reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
   reactionBody: {
    type: String,
    required :true,
    maxLenght: 280,
   },
   username :{
    type: String,
    required :true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => 
      moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm: a'),
      // requirement of Using a getter method to format the timestamp on query
     },
    },
  {
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  });

  module.exports = ReactionSchema;