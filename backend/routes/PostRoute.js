import express from "express";
import { verifyToken } from '../middleware/VerifyToken.js';
import { getPost,getPostbyId,addPost,updatePost,deletePost } from "../controller/PostController.js";

const router = express.Router();

router.get('/posts',getPost);

router.get('/posts/:id',getPostbyId);

router.post('/posts',verifyToken,addPost);

router.patch('/posts/:id',updatePost);

router.delete('/posts/:id',deletePost);

export default router;