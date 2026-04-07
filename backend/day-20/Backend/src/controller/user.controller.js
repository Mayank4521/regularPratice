const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followController(req, res) {
  const followerUserid = req.user.id;
  const followeeUserid = req.params.userId;

  if (followerUserid.toString() === followeeUserid.toString()) {
    return res.status(400).json({
      message: "You cannot follow yourself",
    });
  }

  const isfolloweeExist = await userModel.findById(followeeUserid);

  if (!isfolloweeExist) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const isAlreadyFollowing = await followModel.findOne({
    follower: followerUserid,
    followee: followeeUserid,
  });

  if (isAlreadyFollowing) {
    return res.status(400).json({
      message: "You are already following this user",
    });
  }

  const follow = await followModel.create({
    follower: followerUserid,
    followee: followeeUserid,
    status: "pending"
  });

  return res.status(201).json({
    message: "You are now following this user",
    follow,
  });
}

async function unfollowUserController(req,res){
    const followerUserid = req.user.id
    const followeeUserid = req.params.userId

    const follow = await followModel.findOneAndDelete({
        follower:followerUserid,
        followee:followeeUserid
    })

    if(!follow){
        return res.status(404).json({
            message:"You are not following this user"
        })
    }

    return res.status(200).json({
        message:"You are no longer following this user",
        follow
    })
}

async function getFollowRequestsController(req,res){
    const followeeUserid = req.user.id

    const followRequests = await followModel.find({
        followee:followeeUserid,
        status:"pending"
    })

    if(!followRequests){
        return res.status(404).json({
            message:"No follow requests found"
        })
    }

    return res.status(200).json({
        message:"Follow requests fetched successfully",
        followRequests
    })

}

async function acceptFollowRequestController(req,res){
    const followeeUserid = req.user.id
    const followerUserid = req.params.userId

    const follow = await followModel.findOneAndUpdate({
        follower:followerUserid,
        followee:followeeUserid,
        status:"pending"
    },{
        status:"accepted"
    },{
        returnDocument: "after"
    })

    if(!follow){
        return res.status(404).json({
            message:"Follow request not found"
        })
    }

    return res.status(200).json({
        message:"Follow request accepted successfully",
        follow
    })
}

async function rejectFollowRequestController(req,res){
    const followeeUserid = req.user.id
    const followerUserid = req.params.userId

    const follow = await followModel.findOneAndUpdate({
        follower:followerUserid,
        followee:followeeUserid,
        status:"pending"
    },{status:"rejected"},{
        returnDocument:"after"
    })

    if(!follow){
        return res.status(404).json({
            message:"Follow request not found"
        })
    }

    return res.status(200).json({
        message:"Follow request rejected successfully",
        follow
    })
}

module.exports = {
  followController,
  unfollowUserController,
  getFollowRequestsController,
  acceptFollowRequestController,
  rejectFollowRequestController
}
