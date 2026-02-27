const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")

async function followUserController(req,res){
    const followername = req.user.username
    const followeename = req.params.username

    if(followername === followeename){
        return res.status(400).json({
            message:"You cannot follow yourself"
        })
    }

    const isFolloweeExist = await userModel.findOne({
        username: followeename})

    if(!isFolloweeExist){
        return res.status(404).json({
            message:"user you are trying to follow does not exist"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower: followername,
        followee: followeename
    })

    if(isAlreadyFollowing){
        return res.status(200).json({
            message:`you are already following ${followeename}`,
            follow: isAlreadyFollowing
        })
    }

    const followRecord = await followModel.create({
        follower: followername,
        followee: followeename,
        status: "pending"
    })

    return res.status(201).json({
        message:`You are now following ${followeename}`,
        follow: followRecord
    })

}
async function unfollowUserController(req,res){
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if(!isUserFollowing){
        return res.status(200).json({
            message:`You are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message: `You unfollowed ${followeeUsername}`
    })
}

async function getFollowRequestsController(req,res){
    const followRequest =await followModel.find({
        followee: req.user.username,
        status: "pending"
    })

    return res.status(200).json({
        message:"Follow Requests Fetched Successfully",
        followRequest
    })
}

async function acceptFollowRequestController(req,res){
    const followeeUsername = req.user.username
    const followerUsername = req.params.username


    const followRequest = await followModel.findOneAndUpdate({
        follower: followerUsername,
        followee: followeeUsername,
        status: "pending"
    },{status: "accepted"},
    { returnDocument: "after" }
    )

    if(!followRequest){
        return res.status(404).json({
            message:"Follow request not found"
        })
    }
    
    return res.status(200).json({
        message: "follow request accepted successfully",
        follow: followRequest
    })
}

async function rejectFollowRequestController(req,res){
    const followeeUsername = req.user.username
    const followerUsername = req.params.username

    const followRequest = await followModel.findOneAndUpdate({
        follower: followerUsername,
        followee: followeeUsername,
        status: "pending"
    },{status: "rejected"},
    {returnDocument: "after"}
    )

    if(!followRequest){
        return res.status(404).json({
            message:"Follow request not found"
        })
    }

    return res.status(200).json({
        message:"follow request rejected successfully",
        follow: followRequest
    })
}


module.exports = {
    followUserController,
    unfollowUserController,
    getFollowRequestsController,
    acceptFollowRequestController,
    rejectFollowRequestController
}