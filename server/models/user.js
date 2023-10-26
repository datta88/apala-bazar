import { Schema, model } from "mongoose";
const UserSchema = new Schema({
    name:String,
    email:String,
    password:String,
    mobile:Number,
})

const User = model ('User',UserSchema);

export default User