const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require('moment');

const thoughtSchema = new Schema({
    thoughtText:{
        type: String,
        required: true,
        minLength: 2,
        maxLength:280
    },
    createdAt:{
        type: Date,
        default: Date.now,
        //use moment to format date correctly
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true,
        },
    reactions: [reactionSchema]
},
{
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false
  }
);
//gets the reaction count
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// create the Users model using the Users Schema
const Thought = model('Thought', thoughtSchema);

// Export User module
module.exports = Thought;
