import { Router } from "express";
import { checkSchema } from "express-validator";
import authMiddleWare from "../middlewares/auth.middleware.js";
import { CreatePost, deletePost, getPostById, getPosts, updatePost } from "../controllers/post.controller.js";
import { PostValidationSchema } from "../validations/post.validation.js";
import validate from "../middlewares/validate.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = Router();

router.post("/create",authMiddleWare,upload.fields([{name: "banner", maxCount: 1}, {name: "profile", maxCount: 1}]),checkSchema(PostValidationSchema),validate,CreatePost);

router.get("/getPosts",authMiddleWare,getPosts);

router.get("/getPostById/:id",authMiddleWare,getPostById);

router.patch("/update/:id",authMiddleWare,upload.fields([{name: "banner", maxCount: 1}, {name: "profile", maxCount: 1}]),checkSchema(PostValidationSchema),validate,updatePost);

router.delete("/delete/:id",authMiddleWare,deletePost);

export default router;