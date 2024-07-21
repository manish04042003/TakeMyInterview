
const {User} = require('../schema')
const jwt = require('jsonwebtoken');
const secret =process.env.secret;

const signup =async (req,res)=>{
    let {name,email,password} = req.body;
    let check = await User.findOne({email});

    if(check){
        res.status(200).json({
            message : "Email Id already exist"
        })
    }else{
        let userid = new Date().getTime();
        // console.log(userid)
        let token = await gettoken({userid}) ;
        const user = new User({email,userid,password,name})
        await user.save();
        res.status(200).json({
            message : "success",
            token : token
        })
    }  
}


const login = async (req,res)=>{
    let {email,password} = req.body;
    let check = await User.findOne({email});
    // console.log(check)
    if(check){
        if(check.password===password){
            let token = await gettoken({userid :check.userid});
            res.status(200).json({
                message : "success",
                token : token,
                username : check.username,
                userid: check.userid

            })
        }else{
            res.status(200).json({
                message : "Password Incorrect"
            })
        }
    }else{
        res.status(404).json({
            message : "user not exist",
        })
    }  
}


const gettoken = async (data)=>{
    // console.log('wfndk')
    const token = await jwt.sign(data,secret,{ expiresIn: '100h'});
    return token;
}




module.exports = { signup,login}