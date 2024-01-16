import express from 'express';
import userController from '../controllers/user.controllers.js';
let router = express.Router();
router.route('/').get(userController.home)
router.route('/userAuthentication').post(userController.userSignUp)
router.route('/verifyOtp').post(userController.verifyOtp)
export default router;