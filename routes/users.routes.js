import express from 'express';
import userController from '../controllers/user.controllers.js';
let router = express.Router();
router.route('/').get(userController.home)
export default router;