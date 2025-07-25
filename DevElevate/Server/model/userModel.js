import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type : String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role : { type: String, enum: ['user', 'admin'], default: 'user' },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const userModel = model('User', userSchema);

export default userModel;