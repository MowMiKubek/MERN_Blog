import { Router } from "express";
import postController from "../controller/post-controller.js";

const router = new Router();

router.get("/", postController.getPostList);

export default router;