import { Schema, model } from "mongoose";
const UserSchema = new Schema({
    name:{
        type: String,
        default: '-'
    },
    email:{
        type : String,
        required:true,
    },
    password:{
        type: String,
        required : true,
    },
    mobile:{
        type : Number,
        required:true,
        unique:true,
    },
    address:{
        type:String,
    },
    gender:{
        type:String,
        default:'prefect not to say'
    }
})

const User = model ('User',UserSchema);

export default User