import {Router} from 'express';
import postController from '../controller/post-controller.js';
import sanitizer from '../middleware/sanitize-html.js';

const router = Router();

router.get('/', postController.getPostList);
router.get('/:postID', postController.getPost);
router.post('/create', sanitizer, postController.createPost);

export default router;