import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import {
  addComment,
  addNewPost,
  bookmarkPost,
  deletePost,
  dislikePost,
  getAllPost,
  getCommentsOfPost,
  getLoggedInUserPost,
  likePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.route("/add").post(isAuthenticated, upload.single("image"), addNewPost);
router.route("/all").get(isAuthenticated, getAllPost);
router.route("/user-posts").get(isAuthenticated, getLoggedInUserPost);
router.route("/like/:id").get(isAuthenticated, likePost);
router.route("/dislike/:id", isAuthenticated, dislikePost);
router.route("/comment/:id").post(isAuthenticated, addComment);
router.route("/:id/comment").get(isAuthenticated, getCommentsOfPost);
router.route("/delete/:id").get(isAuthenticated, deletePost);
router.route("/bookmark/:id").get(isAuthenticated, bookmarkPost);

export default router;
