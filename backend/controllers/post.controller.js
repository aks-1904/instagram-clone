import { User } from "../models/user.model.js";
import sharp from "sharp";
import cloudinary from "../utils/cloudinary.js";
import { Post } from "../models/post.model.js";
import { Comment } from "../models/comment.model.js";

export const addNewPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.file;
    const loggedInUserId = req.id;

    if (!image) {
      return res.status(400).json({
        message: "Image required",
        success: false,
      });
    }

    const optimisedImagBuffer = await sharp(image.buffer)
      .resize({ width: image.height, height: image.height, fit: "inside" })
      .toFormat("jpeg", { quality: 80 })
      .toBuffer();

    const fileUri = `data:image/jpeg;base64,${optimisedImagBuffer.toString(
      "base64"
    )}`;

    const cloudResponse = await cloudinary.uploader.upload(fileUri);
    const post = await Post.create({
      caption,
      image: cloudResponse.secure_url,
      author: loggedInUserId,
    });

    const user = await User.findById(loggedInUserId);

    if (user) {
      user.posts.push(post._id);
      await user.save();
    }

    await post.populate({ path: "author", select: "-password" });

    return res.status(201).json({
      message: "New post added",
      success: true,
      post,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPost = async (_, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "username profilePicture" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: { path: "author", select: "username profilePicture" },
      });

    return res.status(200).json({
      posts,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getLoggedInUserPost = async (req, res) => {
  try {
    const loggedInUserId = req.id;

    const posts = await Post.find({ author: loggedInUserId })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "author",
        select: "username profilePicture",
      })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: { path: "author", select: "username profilePicture" },
      });

    return res.status(200).json({
      posts,
    });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (req, res) => {
  try {
    const loggedInUserId = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }

    await post.updateOne({ $addToSet: { likes: loggedInUserId } });
    await post.save();

    return res.status(200).json({
      message: "post liked",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const dislikePost = async (req, res) => {
  try {
    const loggedInUserId = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }

    await post.updateOne({ $pull: { likes: loggedInUserId } });
    await post.save();

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const loggedInUserId = req.id;

    const { text } = req.body;
    const post = await Post.findById(postId);

    if (!text) {
      return res.status(400).json({
        message: "Comment required",
        success: false,
      });
    }

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }

    const comment = await Comment.create({
      text,
      author: loggedInUserId,
      post: postId,
    }).populate({
      path: "author",
      select: "username profilePicture",
    });

    post.comments.push(comment._id);
    await post.save();

    return res.status(201).json({
      message: "Comment added",
      success: true,
      comment,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCommentsOfPost = async (req, res) => {
  try {
    const postId = req.params.id;

    const comments = await Comment.find({ post: postId }).populate({
      path: "author",
      select: "username profilePicture",
    });

    if (!comments) {
      return res.status(404).json({
        message: "No comments",
        success: false,
      });
    }

    return res.status(200).json({
      comments,
      success: true,
    });
  } catch (error) {
    console.log(eror);
  }
};

export const deletePost = async (req, res) => {
  try {

    const postId = req.params.id;
    const loggedInUserId = req.id;

    const post = await Post.findById(postId);

    if(!post){
        return res.status(404).json({
            message: "Post not found",
            success: false,
        });
    }

    if(post.author.toString() !== loggedInUserId.toString()){
        return res.status(401).json({
            message: "You are not authorized to delete this post",
            success: false,
        });
    }

    await Post.findByIdAndDelete(postId);

    let user = await User.findById(loggedInUserId);
    user.posts = user.posts.filter(id => id.toString() !== postId);
    await user.save();

    await Comment.deleteMany({post: postId});

    return res.status(200).json({
        success: true,
        message: "Post deleted",
    });

  } catch (error) {
    console.log(error);
  }
};

export const bookmarkPost = async (req, res)=>{
    try {

        const loggedInUserId = req.id;
        const postId = req.params.id;

        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).json({
                message: "Post not found",
                success: false,
            });
        }

        const user = await User.findById(loggedInUserId);

        if(user.bookmarks.includes(post._id)){
            await user.updateOne({$pull: {bookmarks: post._id}});
            await user.save();

            return res.status(200).json({
                type: 'unsaved',
                message: "Post remove from bookmark",
                success: true,
            });
        }
        else{
            await user.updateOne({$addToSet: {bookmarks: post._id}});
            await user.save();

            return res.status(200).json({
                type: 'unsaved',
                message: "Post bookmarked",
                success: true,
            });
        }
        
    } catch (error) {
        console.log(error);
    }
}