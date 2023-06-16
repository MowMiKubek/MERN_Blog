import apiController from "../controller/api-controller.js";
import {Router} from 'express';
import upload from '../services/uploadimage.js';
import authUpload from '../middleware/is-auth-middleware.js';

const router = new Router();

router.get('/getwcadata', apiController.getWcaData);
// router.get('/upload', apiController.showImageUpload);
router.post('/upload', authUpload, upload.single('image'), apiController.imageUpload);

export default router;