const express = require("express");
const candiController=require("../controllers/candidate");
const {jwtAuthMiddleware,adminMiddleware,voterMiddleware}=require("../middlewares/roleMiddleware");
const route=express.Router();

route.post("/create",jwtAuthMiddleware,adminMiddleware, candiController.createCandidate);
route.put("/:id",jwtAuthMiddleware,adminMiddleware,candiController.updateCandidate);
route.delete("/:id",jwtAuthMiddleware,adminMiddleware, candiController.deleteCand);
route.get("/admin",jwtAuthMiddleware,adminMiddleware,candiController.renderAllCandidate);
route.get("/voter",jwtAuthMiddleware,voterMiddleware, candiController.renderAllCandidate);

module.exports=route;