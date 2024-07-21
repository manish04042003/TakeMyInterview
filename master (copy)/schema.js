const { response } = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.dbconnect);
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    userid : {
        type : Number,
        require : true,
        unique : true
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    password : {
        type : String,
        require : true,
    },
    lastMockInterview: { type: Number, default: null },
    isSubscribed: { type: Boolean, default: false }

})

const questionsSchema = new mongoose.Schema({
    question :{
        type : String,
        require : true
    },
    category : {
        type : String,
        require : true,
    },
    level: {
        type : String
    }
})

const responseSchema = new mongoose.Schema({
    response_id : {
        type : String,
        require : true
    },
    question_id :{
        type: String,
        require : true
    },
    question:{
        type: String,
        require : true
    },
    interview_id :{
        type: String,
        require : true
    },
    userid :{
        type : String,
        require : true,
        unique : false
    },
    audioUrl :{
        type : String,
        require : false
    },
    textResponse :{
        type : String,
        require : true,
    },
    bestAnswer : {
        type : String,
        require : false,
    },
    review : {
        type : Array,
        require : false
    },
    score : {
        type : Number,
        default :0
    }
     
})

const interviewSchema = new mongoose.Schema({
    interview_id : {
        type  : String,
        require : true
    },
    userid :{
        type: String,
        require : true
    },
    questionAndResponseSet : {
        type : Array,
        require: true
    },
    startTime: {
        type : String,
        require : true,
    },
    score : {
        type : Number,
        default : 0
    } 
     
})


const User = mongoose.model('Users',userSchema);
const Question = mongoose.model('Question',questionsSchema);
const Response = mongoose.model('Response',responseSchema);
const Interview = mongoose.model('Interview',interviewSchema)

module.exports = { User, Question, Response, Interview}