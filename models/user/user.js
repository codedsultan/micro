import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    minlength: [3, "First name must be at least 3 characters."],
    required: [true, "Please enter a first name."],
  },

  lname: {
    type: String,
    required: [true, "Please enter a last name."],
  },

  email: {
    type: String,
    required: [true, "Please enter an email."],
    unique: [true, "Email already exists."],
  },

  emailVerified: {
    type: Boolean,
    default: false,
  },

  uname: {
    type: String,
    required: [true, "Please enter an username."],
    unique: [true, "Username not available."],
    minlength: [3, "Username must be at least 3 characters."],
    maxlength: [20, "Username must not exceeds 20 characters."],
  },

  phone: {
    countryCode: String,
    phoneNo: String,
  },

  phoneVerified: {
    type: Boolean,
    default: false,
  },

  password: {
    type: String,
    required: [true, "Please enter a password."],
    minlength: [6, "password must be at least 6 characters."],
    select: false,
  },

  status:{
    type:String,
    default:"Hey there! I am using Micro."   
  },

  publicKey: {type : String},
  privateKey: {type: String},
  hashedPass: {type : String},
  avatar: {
    public_id: String,
    url: String,
  },
  profile_pic:{
    type:String,
    default:"https://drgsearch.com/wp-content/uploads/2020/01/no-photo.png" 
  },
  gender: String,

  dob: String,

  about: String,

  location: {
    type: String,
  },

  website: {
    type: String,
  },

  urls: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Url",
    },
  ],

  urlsCount: {
    type: Number,
    default: 0,
  },

  role: {
    type: String,
    enum: ["user", "admin", "superadmin", "moderator"],
    default: "user",
  },

  accountStatus: {
    type: String,
    enum: [
      "active", "inactive", "deactivated",
      "suspended", "blocked", "deleted",
      "banned", "reported", "pending",
      "withheld", "restricted",
    ],
    default: "active",
  },

  verificationStatus: {
    type: String,
    enum: ["verified", "unverified", "pending", "rejected"],
    default: "unverified",
  },

  isVerified: {
    type: Boolean,
    default: false,
  },
  
  isValid: {
    type: Boolean,
    default: false,
  },
  
  otp: {
    type: mongoose.Types.ObjectId,
    ref: "OTP",
  },

  token: String,
  
  expiresAt: Number,

  resetPasswordToken: String,
  resetPasswordExpire: Date,

  loggedInDevices: [
    {
      type: mongoose.Types.ObjectId,
      ref: "DeviceInfo",
    },
  ],
  lastActive: Date,

  createdAt: {
    type: Date,
    default: Date.now,
  },
  fbid: String,
});

// Hash Password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 16);
});

// JWT Token
userSchema.methods.generateToken = async function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const decodedData = jwt.decode(token);
  this.token = token;
  this.expiresAt = decodedData.exp;

  return token;
};

// Match Password
userSchema.methods.matchPassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

userSchema.index({ uname: "text", fname: "text", lname: "text" });
const User = mongoose.model("User", userSchema);

export default User;
