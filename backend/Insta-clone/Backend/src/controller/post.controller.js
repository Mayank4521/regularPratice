const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const likeModel = require("../models/like.model");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "cohort-2-instaclone",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    userId: req.user.id,
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
}

async function fetchPostDetailsController(req, res) {
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  if (post.userId.toString() !== req.user.id) {
    return res.status(401).json({
      message: "Unathorized access",
    });
  }

  return res.status(200).json({
    message: "Post fetched successfully",
    post,
  });
}

async function likePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const isLiked = await likeModel.findOne({
    post: postId,
    username: username,
  });

  if(isLiked){
    return res.status(409).json({
      message: "Post already liked",
    })
  }

  const like = await likeModel.create({
    post:postId,
    username:username
  })

  res.status(200).json({
    message: "Post liked successfully",
    like,
  });
}

async function unlikePostController(req,res){
  const postId = req.params.postId
  const username = req.user.username

  const isLiked = await likeModel.findOne({
    post:postId,
    username:username
  })

  if(!isLiked){
    return res.status(401).json({
      message:"you have not liked the post"
    })
  }

  await likeModel.findOneAndDelete({
    post:postId,
    username:username
  })

  res.status(200).json({
    message:"you unliked the post"
  })

}

async function fetchPostsController(req, res) {
  const posts = await Promise.all((await postModel.find({ userId: req.user.id }).populate("userId").lean())
  .map(async(post)=>{
    const isLiked = await likeModel.findOne({
      post: post._id,
      username: req.user.username,
    })

    post.isLiked = Boolean(isLiked)
    return post
  }))


  res.status(200).json({
    message: !posts.length===0 ? "No posts found" : "Posts fetched successfully",
    posts,
  });
}

async function getFeedController(req,res){
  const posts = await Promise.all((await postModel.find().populate("userId").lean())
      .map(async(post)=>{

        const isLiked = await likeModel.findOne({
          post:post._id,
          username:req.user.username
        })

           post.isLiked = Boolean(isLiked)

           return post
       }))


  res.status(200).json({
    message:"feed fetched successfully",
    posts
  })
}

module.exports = {
  createPostController,
  fetchPostsController,
  fetchPostDetailsController,
  likePostController,
  unlikePostController,
  getFeedController
};
