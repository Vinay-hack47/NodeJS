import express from 'express';
import upload from '../config/multerConfig.js';
import {
  uploadFile,
  getFiles,
  deleteFile,
  downloadFile
} from '../controllers/uploadController.js';
import { getTrendingRepos } from '../controllers/trendingController.js';

const router = express.Router();

router.post('/upload', upload.single('myFile'), uploadFile);
router.get('/files', getFiles);
router.get('/download/:id', downloadFile);
router.delete('/delete/:id', deleteFile);


router.get('/trending', getTrendingRepos);

export default router;
