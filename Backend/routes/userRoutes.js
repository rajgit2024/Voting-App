const express=require("express");
const userController=require("../controllers/userController");
const {verifyEmail}=require("../controllers/verifyEmail");
const { jwtAuthMiddleware,voterMiddleware } = require("../middlewares/roleMiddleware");
const upload = require("../config/multerConfig");
const route=express.Router();

route.post("/register",userController.registerUser);
route.post("/login", userController.loginUser);
route.get("/profile",jwtAuthMiddleware,voterMiddleware,userController.userProfile);
route.put("/profile/password",jwtAuthMiddleware,voterMiddleware,userController.updatePass);
route.get("/verify-email/:token", verifyEmail);
route.post(
    "/upload-profile-image",
    jwtAuthMiddleware,
    upload.single("profile_image"),
    userController.uploadProfileImage
  );

module.exports=route;