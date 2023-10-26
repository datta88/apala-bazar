import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.js';
dotenv.config();
 
const app = express();
app.use(express.json());

const connectDB = async ()=>{
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if(conn){
        console.log(`MongoBD connected `)
    }
}

app.post('/signup', async (req,res)=>{
    const {name, email, password, mobile,address, gender} =req.body

    const user = new User({
        name,
        email,
        password,
        mobile,
        address,
        gender,
    })

    try{
        const saveUser = await user.save();

    res.json({
        success:true,
        data:saveUser,
        message:"signup successfilly"

    })
}
catch(e){
    res.json({
        success :false,
        message:e.message
    })
}

});

app.post('/login', async (req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
       return res.json({
            success: false,
            message :'please provide email and password'
        })
    }
    const user = await User.findOne({
        email:email,
        password:password
    }).select("name email mobile")
    if(user){
        return res.json({
            success: true,
            data: user,
            message: 'login successful',
        })
    }
    else{
        return res.json({
            success:false,
            message:"Invalid credentials"
        });
    }
})
const PORT =process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server is running  : ${PORT}`);
    connectDB();
});