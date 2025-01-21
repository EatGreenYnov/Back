import express from "express";
import { register, login, update, checkToken } from "../controllers/UserController.js";
import jwtVerify from "../middleware/jwtVerify.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update", jwtVerify, update);
router.get("/checkToken", jwtVerify, checkToken);

export default router;
