import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
  originalName: String,
  size: Number,
  path: String,
  uploadDate: {
    type: Date,
    default: Date.now
  }
});

export const File = mongoose.model('File', FileSchema);

