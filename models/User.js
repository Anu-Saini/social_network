const { Schema, model } = require('mongoose');

// Schema to create User model
const UserSchema = new Schema(
  {
   username: { 
    type: String,
    required :true,
    unique:true,
    trim:true,
   },
   email: {
    type: String,
    required :true,
    unique:true,
    match: [
     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    ],
   },
   thoughts :[
    {
     type: Schema.Types.ObjectId,
     ref: 'Thought',
   },
   ],
   friends : [
    {
     type: Schema.Types.ObjectId,
     ref: 'User',
   },
  ],
  },
   {
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  });

// Create a virtual property `fullName` that gets and sets the user's full name
UserSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  })

 // Initialize our User model
const User = model('User', UserSchema);

module.exports = User;
  