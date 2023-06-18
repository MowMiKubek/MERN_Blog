import apiController from "../controller/api-controller.js";
import {Router} from 'express';
import upload from '../services/uploadimage.js';
import tokenVerification from '../middleware/tokenVerification.js';
import permissionVerification from "../middleware/permissionVerification.js";

const router = new Router();

router.get('/getwcadata', apiController.getWcaData);
router.post('/upload', tokenVerification, permissionVerification, upload.single('image'), apiController.imageUpload);

export default router;