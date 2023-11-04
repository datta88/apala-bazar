import { Schema,model } from "mongoose";

const orderSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    product:{
        type:Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    deleveryCharges:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        default:1
    },    
    status:{
        type:String,
       default:"pending"
    }
},
{
    timeStamps:true,
}
)

const Order = model ('Order',orderSchema);
export default Order