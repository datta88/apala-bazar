import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.js';
import c from './models/product.js';
import Products from './models/product.js';
dotenv.config();

const app = express();
app.use(express.json());

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if (conn) {
        console.log(`MongoBD connected `)
    }
}
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
    const searchpro = await Products.find({ name: { $regex: q, $options: 'i' } })
    res.json({
        success: true,
        data: searchpro,
        message: 'Product searched SuccessFully .'
    })
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running  : ${PORT}`);
    connectDB();
});