import dotenv from 'dotenv';
dotenv.config();
import { Schema, model } from 'mongoose';
import bcryptjs from 'bcryptjs';
import cloudinary from '../../config/cloudinary/index.mjs';
import jwt from 'jsonwebtoken'

const Users = new Schema({
  fullName: {
    type: String,
    default: '',
    required: true,
    trim: true,
  },
  username: {
    type: String,
    default: '',
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    default: '',
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    default: '',
    required: true,
    trim: true,
    minLength: 7,
  },
  avatar: {
    type: String,
    default:
      'https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg',
  },
  roles: {
    type: Schema.Types.ObjectId,
    ref: 'roles'
  }
}, {
  timestamps: true
});

Users.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcryptjs.hash(user.password, 10);
  }
  next();
});

Users.methods.uploadFileToCloudinary = async function (file) { 
  const user = this;
  try {
    if (!file) {
      return {
        status: false,
        message: 'Missing information',
      };
    } else {
      const result = await cloudinary.uploader.upload(file, {
        upload_preset: process.env.UPLOAD_PRESET,
      });
      user.avatar = result.secure_url;
      await user.save();
      return {
        status: true,
        message: 'Upload successful',
        imageUrl: result.secure_url,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: 'Error uploading image',
    };
  }
};

Users.methods.generateAccessToken = function () { 
  return jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

Users.methods.generateRefreshToken = function () { 
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '365d' });
};

Users.methods.addRole = async function (role) {
  try {
    this.roles = role._id;
    await this.save();

    role.userId = this._id;
    await role.save();

    return {
      status: true,
      message: 'Role added successfully',
    };
  } catch (error) {
    return {
      status: false,
      message: 'Error adding role',
    };
  }
};


export default model('users', Users);
