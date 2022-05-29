const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
    type: String,
    unique: true,
    required: true,
    trim: true
    },
    //validates email
    email:{
        type: String,
        required: true,
        unique: true,
        pattern: "^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$"
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref:'Thought'
    }],
    friends: [{
        type:Schema.Types.ObjectId,
        ref:'User'
    }]
    
        
},
{
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false
  }
)
//gets total of friends.
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

// create the Users model using the Users Schema
const User = model('User', userSchema);

// Export User module
module.exports = User;
