import mongoose from "mongoose";

const sessionSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  refreshToken: String, // Hashed
  userAgent: String,
  ipAddress: String,
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
});

export const Session = mongoose.model("Session", sessionSchema);
