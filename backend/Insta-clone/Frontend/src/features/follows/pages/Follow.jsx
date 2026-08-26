import React, { useEffect } from "react";
import "../style/follow.scss";
import Nav from "../../shared/Nav";
import User from "../components/User";
import useFollow from "../hooks/useFollow";

const Follow = () => {
  const {
    followers,
    loading,
    followings,
    others,
    pendings,
    handleAllFollowData,
    handleAcceptRequest,
    handleRejectRequest,
    handleFollow,
    handleUnFollow
  } = useFollow();

  useEffect(() => {
    handleAllFollowData();
  }, []);

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main className="follow-page">
      <Nav />

      <div className="follow-container">
        <div className="follower-list">
          <h2>Followers</h2>
          {followers.map((user) => {
            return (
              <User
                key={user._id}
                username={user.follower.username}
                profileImage={user.follower.profileImage}
                isFollowing = {user.isFollowing}
                handleFollow={async(username)=>{
                  await handleFollow(username)
                  await handleAllFollowData()
                }}
                handleUnFollow={async(username)=>{
                  await handleUnFollow(username)
                  await handleAllFollowData()
                }}
              />
            );
          })}
        </div>
        <div className="following-list">
          <h2>Following</h2>
          {followings.map((user) => {
            return (
              <User
                key={user._id}
                username={user.following.username}
                profileImage={user.following.profileImage}
                isFollowing = {user.isFollowing}
                handleUnFollow={async(username)=>{
                  await handleUnFollow(username)
                  await handleAllFollowData()
                }}
              />
            );
          })}
        </div>
        <div className="pendings">
          <h2>Follow Requests</h2>
          {pendings.map((user) => {
            return (
              <User
                key={user._id}
                username={user.follower.username}
                profileImage={user.follower.profileImage}
                requestId={user.follower._id}
                type='pending' 
                handleAcceptRequest={async(id)=>{
                  await handleAcceptRequest(id)
                  await handleAllFollowData()
                }}
                handleRejectRequest={async(id)=>{
                  await handleRejectRequest(id)
                  await handleAllFollowData()
                }}
              />
            );
          })}
        </div>
        <div className="other-user">
          <h2>Other Users</h2>
          {others.map((user) => {
            return (
              <User
                key={user._id}
                username={user.username}
                profileImage={user.profileImage}
                handleFollow={async(username)=>{
                  await handleFollow(username)
                  await handleAllFollowData()
                }}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Follow;
