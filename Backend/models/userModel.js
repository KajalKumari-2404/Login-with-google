import mongoose from 'mongoose';

// Schema
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, 'user name is required'],
    },

    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
    },

    provider: {
      type: String,
      default: 'google',
    },

    googleId: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('user', userSchema);

export default User;