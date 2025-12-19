import {Router} from "express";
import { checkUserAuth } from "../middlewares/auth.middlewere.js";
import { createBlog, deleteBlog, getMyBlogs, getPublicBlogs, updateBlog } from "../controllers/blog.controller.js";

const router = Router();

router.post("/create", checkUserAuth, createBlog);
router.get("/public", checkUserAuth, getPublicBlogs);
router.get("/", checkUserAuth, getMyBlogs);
router.put("/update/:blogId", checkUserAuth, updateBlog);
router.delete("/delete/:blogId", checkUserAuth, deleteBlog);

export default router;