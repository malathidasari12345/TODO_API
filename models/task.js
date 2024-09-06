const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    title: {
        type: String,
        required : true
    },
  description :{
    type :String,
    required : true
  },
    iscompleted: {
        type: Boolean,
        default: false
    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    createdAt :{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Task', Schema);
