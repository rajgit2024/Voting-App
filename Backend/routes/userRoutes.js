const express=require("express");
const userController=require("../controllers/userController");
const {verifyEmail}=require("../controllers/verifyEmail");
const { jwtAuthMiddleware,voterMiddleware } = require("../middlewares/roleMiddleware");
const upload = require("../config/multerConfig");
const route=express.Router();
const { uploadProfileImage } = require("../controllers/userController");

route.post("/register",userController.registerUser);
route.post("/login", userController.loginUser);
route.get("/profile",jwtAuthMiddleware,voterMiddleware,userController.userProfile);
route.put("/profile/password",jwtAuthMiddleware,voterMiddleware,userController.updatePass);
route.get("/verify-email/:token", verifyEmail);
// Route to handle image upload
// Route to upload profile image
route.post('/upload-profile-image', jwtAuthMiddleware, upload.single('profileImage'), uploadProfileImage);
module.exports=route;