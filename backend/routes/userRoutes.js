import express, { Router } from "express";
import { userRegister, userLogin } from "../controllers/user.controller.js";

const router = Router();

router.post("/register", userRegister);
router.post("/login", userLogin);

export default router;