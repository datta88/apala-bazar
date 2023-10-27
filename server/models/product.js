
import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
    {
        name:{
    type: String,
    required: true
},
    description:{
    type: String
},
    price:{
    type: String,
    required: true,
},
    image:{
    type: String,
},
    category:{
    type: String,
    required: true,
},
    brand:{
    type: String,

}

    },{ timestamps: true }
    )
    const Products = model ("Product",ProductSchema);
    export default Products