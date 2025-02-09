import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },

  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },

  body: {
    type: String,
  },

  refId: String,

  type: {
    type: String,
    enum: [
      "normal", "security", 
    ],
    default: "normal",
  },

  isRead: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;