import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.js';
dotenv.config();
import Products from './models/product.js';
import Order from "./models/order.js";



const app = express();
app.use(express.json());

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if (conn) {
        console.log(`MongoBD connected `)
    }
};

app.post('/signup', async (req, res) => {
    const { name, email, password, mobile, address, gender } = req.body

    const user = new User({
        name,
        email,
        password,
        mobile,
        address,
        gender,
    })

    try {
        const saveUser = await user.save();

        res.json({
            success: true,
            data: saveUser,
            message: "signup successfilly"

        })
    }
    catch (e) {
        res.json({
            success: false,
            message: e.message
        })
    }

});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({
            success: false,
            message: 'please provide email and password'
        })
    }
    const user = await User.findOne({
        email: email,
        password: password
    }).select("name email mobile")
    if (user) {
        return res.json({
            success: true,
            data: user,
            message: 'login successful',
        })
    }
    else {
        return res.json({
            success: false,
            message: "Invalid credentials"
        });
    }
});

//----get all product fetched-----
app.get('/products', async (req, res) => {
    const allproduct = await Products.find();

    res.json({
        success: true,
        data: allproduct,
        message: 'all product fetched.'
    })
});

//----Post one product add-----
app.post('/productadd', async (req, res) => {
    const { name, description, price, image, category, brand } = req.body;
    const saveProduct = new Products(
        {
            name,
            description,
            price,
            image,
            category,
            brand
        })



    try {
        const savePro = await saveProduct.save();
        res.json({
            success: true,
            data: savePro,
            message: 'Product Added successFully . '
        })
    }
    catch {
        res.json({
            success: false,
            message: 'e.message',
        })
    }
});

//----get one Product fetched by id-----
app.get('/product/:_id', async (req, res) => {
    const { _id } = req.params;
    const productOne = await Products.findOne({ _id: _id })
    res.json({
        success: true,
        data: productOne,
        message: 'One Product Fetched'
    })
});

//-------put update product by id------
app.put('/product/:_id', async (req, res) => {
    const { _id } = req.params;
    const { name, description, price, image, category, brand } = req.body;

    await Products.updateOne({ _id: _id }, {
        $set: {
            name: name,
            description: description,
            price: price,
            image: image,
            category: category,
            brand: brand,
        }
    })

    const updateProduct = await Products.findOne({ _id: _id });

    res.json({
        success: true,
        data: updateProduct,
        message: 'update successfully',
    })
});

//-----delete Product by id------
app.delete('/product/:_id', async (req, res) => {
    const { _id } = req.params;
    await Products.deleteOne({ _id: _id });

    res.json({
        success: true,
        message: 'deleted Product SuccessFully.'
    })
});

//-----search Product ------

app.get('/searchProduct', async (req, res) => {
    const { q } = req.query;
    const searchpro = await Products.findOne({ name: { $regex: q, $options: 'i' } })
    res.json({
        success: true,
        data: searchpro,
        message: 'Product searched SuccessFully .'
    })
});

// -----Post order ------
app.post('/order', async (req, res) => {
    const { user, product, status, deleveryCharges, orderShippting, quantity } = req.body;

    const orderProduct = new Order({
        user,
        product,
        status,
        deleveryCharges,
        orderShippting,
        quantity
    })

    try {
        const saved = await orderProduct.save();
        res.json({
            success: true,
            data: saved,
            message: 'Product successfully .'
        })
    }
    catch (e) {
        res.json({
            success: false,
            message: e.message
        })
    }
});

//-----get one fetched-------
app.get('/order/:id', async (req, res) => {

    const { id } = req.params;
    const orderOne = await Order.findOne({ _id: id }).populate('user product')

    orderOne.user.password = undefined;
    res.json({
        success: true,
        data: orderOne,
        message: "Order fetched successfully . "
    })
});

//----get all product feched-------
app.get('/orders', async (req, res) => {
    const orders = await Order.find().populate('user product')
    orders.forEach((e) =>{
        e.user.password = undefined;
    })

    res.json({
        success: true,
        data: orders,
        message: 'order feched successfully .'
    })
})

//-----get fine by user ------
app.get('/userorder/:_id',async (req,res)=>{
    const {_id} = req.params;
    const userOrder = await Order.find({user:{_id:_id}}).populate('user product');

    userOrder.forEach((e)=>{
        e.user.password = undefined;
    });

    res.json({
        success : true,
        data : userOrder,
        message : 'Order of user founds successfully'
    })
})

//-----patch status------
app.patch('/order/:_id', async (req,res)=>{
    const {_id}=req.params;
    const {_status} = req.body;

   await Order.updateOne({_id:_id},{$set:{_status : _status}})
    const orderStatus = await Order.findOne({_id:_id});

        res.json({
            success:true,
            data:orderStatus,
            message:'order Update successfully'
        });
   

})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running  : ${PORT}`);
    connectDB();
});