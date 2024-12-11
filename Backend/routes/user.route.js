import { Router } from "express";
import { login, Signup } from "../controller/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";

 const router = Router()


 //new user register
router.route('/signup').post(upload.single("avatar"),Signup)
//login
router.route('/login').post(login)

export default router