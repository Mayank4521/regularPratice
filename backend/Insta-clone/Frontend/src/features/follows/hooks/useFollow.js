import { useContext, useEffect } from "react";
import { FollowContext } from "../follow.context";
import {
  fetchFollow,
  fetchFollowing,
  fetchSuggestedusers,
  pendingRequest,
  acceptFollowRequest,
  rejectFollowRequest,
  followUser,
  unFollowUser
} from "../services/follow.api";

const useFollow = () => {
  const context = useContext(FollowContext);
  const {
    followers,
    setFollowers,
    loading,
    setLoading,
    followings,
    setFollowings,
    others,
    setOthers,
    pendings,
    setPendings
  } = context;

  const handleAllFollowData = async () => {
    try {
      setLoading(true);

      const [followerRes, followingRes, suggestedRes,pendingRes] = await Promise.all([
        fetchFollow(),
        fetchFollowing(),
        fetchSuggestedusers(),
        pendingRequest()
      ]);

      setFollowers(followerRes.followers);
      setFollowings(followingRes.followings);
      setOthers(suggestedRes.users);
      setPendings(pendingRes.requestPresents)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest= async(user)=>{
    try{
        await acceptFollowRequest(user)
        await handleAllFollowData()
    }catch(err){
        throw err
    }
  }

  const handleRejectRequest= async(user)=>{
    try{
        await rejectFollowRequest(user)
        await handleAllFollowData()
    }catch(err){
        console.log(err)
    }
  }

  const handleFollow = async(username)=>{
    try{
        await followUser(username)
    }catch(err){
      console.log(err)
    }
  }

  const handleUnFollow = async(username)=>{
    try{
      await unFollowUser(username)
    }catch(err){
      console.log(err)
    }
    }



  return {
    followers,
    handleAllFollowData,
    loading,
    followings,
    others,
    pendings,
    handleAcceptRequest,
    handleRejectRequest,
    handleFollow,
    handleUnFollow
  };
};

export default useFollow;
