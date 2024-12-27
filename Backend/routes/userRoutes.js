const express=require("express");
const userController=require("../controllers/userController");
const { jwtAuthMiddleware } = require("../middlewares/roleMiddleware");
const route=express.Router();

route.post("/register",userController.registerUser);
route.post("/login", userController.loginUser);
route.get("/profile",jwtAuthMiddleware,userController.userProfile);
route.put("/profile/password",jwtAuthMiddleware,userController.updatePass);

module.exports=route;