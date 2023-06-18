import {Router} from 'express';
import postController from '../controller/post-controller.js';
import sanitizer from '../middleware/sanitize-html.js';
import tokenVerification from '../middleware/tokenVerification.js';

const router = Router();

router.get('/', postController.getPostList);
router.post('/comment', tokenVerification, postController.addComment)
router.get('/:postID', postController.getPost);
router.post('/', tokenVerification, sanitizer, postController.createPost);
router.delete('/', tokenVerification, postController.deletePost);
router.put('/', tokenVerification, postController.updatePost);

export default router;