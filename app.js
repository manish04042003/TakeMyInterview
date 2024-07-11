const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const {signup, login} = require('./controlers/onboarding.js')
const app = express();
const PORT_NO = 3000;
const secret =process.env.secret;

const cors = require("cors");

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000']
}));


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(bodyParser.json());

exports.authenticateToken = async (req,res,next)=>{
    let token = req.header('Authorization');
    try{
        const data = await jwt.verify(token,secret);
        req.data = data;
        next();
    }catch(err){
        res.json({
            message : "error",
            error : err
        })
    }
}

app.post('/islogin', async (req,res)=>{
    let {token} = req.body;
    try{
        const data = await jwt.verify(token,secret);
        req.data = data;
        console.log("islogin done")
        res.json({
            message : "success",
        })
    }catch(err){
        res.json({
            message : "error",
            error : err
        })
    }
})


// onboarding routers
app.post('/signup',signup);
app.post('/login', login)

// All three Router Import from router Folder
const dashboardRoute = require('./routes/dashboard.js');
// const striperoute = require('./routes/stripe.js');



//dashboard rputes
app.use("/dashboard",dashboardRoute);
// app.use("/stripe",striperoute);


app.listen(PORT_NO,()=>{
    console.log("server is nunning on port no " + PORT_NO);
})


