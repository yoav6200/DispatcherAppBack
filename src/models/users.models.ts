import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema({
  uid: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, default: null },
  favoriteItems: [{ type: String }],
});

export const User = mongoose.model('User', userSchema, 'users');
