import {Router} from 'express';
import userController from '../controller/user-controller.js';
import validateToken from '../middleware/tokenVerification.js'
const router = Router();


router.get('/', validateToken, userController.getUserData)
router.get('/all/', validateToken, userController.getUsersList)
router.put('/', validateToken, userController.profileEdit)
router.delete('/', validateToken, userController.delete)

router.post('/password', validateToken, userController.passwordChange)
router.post('/adminpanel', validateToken, userController.changeRole)
router.post('/login/', userController.login)
router.post('/', userController.register)

// router.post('/register', userController.register);
// router.post('/login', userController.login);

// router.post('/edit', userController.profileEdit);

// router.post('/password', userController.password);

// router.post('/delete', userController.delete);

// router.get('/logout', userController.logout);

// router.get('/adminPanel', userController.adminPanelShow);
// // router.post('/adminPanel', userController.adminPanel);
// router.get('/roleuser/:userID', userController.roleUser);
// router.get('/rolemoder/:userID', userController.roleModerator);
// router.get('/roleadmin/:userID', userController.roleAdmin);

// router.get('/renewapi', userController.renewApiToken);
export default router;