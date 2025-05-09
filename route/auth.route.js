import express from 'express';
import { userRegister, userLogin } from '../controller/auth.controller.js';
import upload from '../utils/multer.js';  // Using 'import' instead of 'require'

const router = express.Router();

router.post('/register', upload.none(), userRegister);
router.post('/login', upload.none(), userLogin);

export default router;   // ES-module export
