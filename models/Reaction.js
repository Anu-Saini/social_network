const { Schema, model } = require('mongoose');
// const moment = require('moment');

// Schema to create Reaction model
const ReactionSchema = new Schema(
  {
   reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
   reactionBody: {
    type:string,
    required :true,
    maxLenght: 280,
   },
   username :{
    type:string,
    required :true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
      // get: (createdAtVal) => 
      // moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm: a'),
      // requirement of Using a getter method to format the timestamp on query
     },
    },

// **Schema Settings**:

// This will not be a model, but rather will be used as the `reaction` field's subdocument schema in the `Thought` model.

  {
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  });

  module.exports = ReactionSchema;