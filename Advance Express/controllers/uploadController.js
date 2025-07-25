import fs from 'fs';
import path from 'path';
import { File } from '../models/model.file.js';

export const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const newFile = new File({
      originalName: req.file.originalname,
      size: req.file.size,
      path: req.file.path
    });

    await newFile.save();

    res.json({
      message: '✅ File uploaded successfully',
      file: {
        id: newFile._id,
        name: newFile.originalName,
        size: newFile.size,
        path: newFile.path
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getFiles = async (req, res, next) => {
  try {
    const files = await File.find().sort({ uploadDate: -1 });
    res.json(files);
  } catch (err) {
    next(err);
  }
};

export const deleteFile = async (req, res, next) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ error: 'File not found' });

    fs.unlink(file.path, async (err) => {
      if (err) return next(err);
      await file.deleteOne();
      res.json({ message: '🗑️ File deleted' });
    });
  } catch (err) {
    next(err);
  }
};

export const downloadFile = async (req, res, next) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ error: 'File not found' });

    res.download(path.resolve(file.path), file.originalName);
  } catch (err) {
    next(err);
  }
};
