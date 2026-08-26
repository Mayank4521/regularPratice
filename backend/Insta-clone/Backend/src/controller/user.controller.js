const followModel = require("../models/follow.model");
const userModel = require("../models/auth.model");

async function followUserController(req, res) {
  const followerId = req.user.id;
  const followingUsername = req.params.username;

  const followingUser = await userModel.findOne({
    username: followingUsername
  })

  if(!followingUser){
    return res.status(404).json({
      message:`${followingUsername} does not exist`
    })
  }

  if (followerId.toString() === followingUser._id.toString()) {
    return res.status(400).json({
      message: "You cannot follow yourself",
    });
  }

  const isFollowing = await followModel.findOne({
    follower: followerId,
    following: followingUser._id,
  });

  if (isFollowing) {
    return res.status(409).json({
      message: `You are already following ${followingUsername}`,
      follow: isFollowing,
    });
  }

  const followRecord = await followModel.create({
    follower: followerId,
    following: followingUser._id,
  });

  res.status(201).json({
    message: `You are now following ${followingUsername}`,
    follow: followRecord,
  });
}

async function unfollowUserController(req, res) {
  const followerId = req.user.id;
  const followingUsername = req.params.username;

  const followingUser = await userModel.findOne({
    username: followingUsername,
  });

  if (!followingUser) {
    return res.status(404).json({
      message: `${followingUsername} does not exist`,
    });
  }

  if (followerId.toString() === followingUser._id.toString()) {
    return res.status(400).json({
      message: "You cannot unfollow yourself",
    });
  }


  const isFollowing = await followModel.findOne({
    follower: followerId,
    following: followingUser._id,
  });

  if (!isFollowing) {
    return res.status(200).json({
      message: `You are not following ${followingUsername}`,
    });
  }

  await followModel.findByIdAndDelete(isFollowing._id);

  res.status(200).json({
    message: `You have unfollowed ${followingUsername}`,
  });
}

async function fetchAllFollowRequestsController(req, res) {
  const user = req.user.id;

  const requestPresents = await followModel.find({
    following: user,
    status: "pending",
  }).populate("follower");


  res.status(200).json({
    message: requestPresents.length===0?"no follow requests found":"follow requests found",
    requestPresents,
  });
}

async function acceptRequestController(req,res){
    const followerId = req.params.followerid
    const user = req.user.id

    const follower = await userModel.findById(followerId)

    const isrequestPresent = await followModel.findOne({follower:followerId,following:user,status:"pending"})

    if(!isrequestPresent){
        return res.status(404).json({
            message:'follow request not present'
        })
    }


    await followModel.findOneAndUpdate({follower:followerId,following:user,status:"pending"},{status:"accepted"})

    res.status(200).json({
        message:`request accepted from ${follower.username}`
    })

}

async function rejectRequestController(req,res){
    const followerId = req.params.followerid
    const user = req.user.id

    const follower = await userModel.findById(followerId)
    const isrequestPresent = await followModel.findOne({follower:followerId,following:user,status:"pending"})
    
    if(!isrequestPresent){
        return res.status(404).json({
            message:"request not present"
        })
    }

    await followModel.findOneAndDelete({follower:followerId,following:user,status:"pending"},{status:"rejected"})

    res.status(200).json({
        message:`you rejected the request from ${follower.username}`
    })

}

async function fetchFollowersController(req, res) {
    const user = req.user.id

    const followers = await Promise.all((await followModel.find({following:user,status:"accepted"}).populate("follower").lean())
    .map(async(follower)=>{
        const isFollowing = await followModel.findOne({follower:user,following:follower.follower._id})

        follower.isFollowing= Boolean(isFollowing)
        return follower
    }))

    res.status(200).json({
        message:followers.length===0?"you dont have any followers":"all followers",
        followers
    })
}

async function fetchFollowingController(req,res){
    const user = req.user.id

    const followings = await Promise.all((await followModel.find({follower:user,status:"accepted"}).populate("following").lean())
    .map(async(following)=>{
    const isFollowing =await followModel.find({follower:user,following:following.following._id})

    following.isFollowing=Boolean(isFollowing)
    return following}
  )
  )

    

    res.status(200).json({
        message: followings.length===0?"you dont have any following":"all following",
        followings
    })
}

async function fetchAllUsersController(req, res) {
  const userId = req.user.id;

  const followingUsers = await followModel.find({follower:userId,status:{
    $in:["accepted","pending"]}})
 
  const followingIds = followingUsers.map((follow)=>follow.following)

  const suggestedUsers = await userModel.find({
    _id:{$nin:[...followingIds,userId]}
  })

  

  res.status(200).json({
    message: suggestedUsers.length===0?"no suggested users":"Suggested users",
    users: suggestedUsers,
  });
}

module.exports = {
  followUserController,
  unfollowUserController,
  fetchAllFollowRequestsController,
  acceptRequestController,
  rejectRequestController,
  fetchFollowersController,
  fetchFollowingController,
  fetchAllUsersController
};
