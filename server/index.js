import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
 
const app = express();
app.use(express.json());

const connectDB = async ()=>{
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if(conn){
        console.log(`MongoBD connected `)
    }
}

const PORT =process.env.PORT || 5000;

//const Product = model('product',userSchema);

// app.post('/product',async(req,res)=>{
//     const product = await Product.find()
//     res.json({
//         success:true,
//         data:product,
//         message : `successful fetched data`
//     })
// })

app.listen(PORT,()=>{
    console.log(`server is running  : ${PORT}`);
    connectDB();
});