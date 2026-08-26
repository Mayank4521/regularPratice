import React from "react";

const User = ({
  username,
  profileImage,
  requestId,
  type,
  handleAcceptRequest,
  handleRejectRequest,
  isFollowing,
  handleFollow,
  handleUnFollow
}) => {
  return (
    <div className="user">
      <div className="img-wrapper">
        <img src={profileImage} />
      </div>
      <p>{username}</p>
      <div className="user-button">
        {type === "pending" ? (
          <div className="requestContainer">
            <button onClick={()=>handleAcceptRequest(requestId)} className="follow-button">Accept</button>
            <button onClick={()=>handleRejectRequest(requestId)} className="follow-button">Reject</button>
          </div>
        ) : isFollowing===true ? (
          <button onClick ={()=>handleUnFollow(username)} className="follow-button">Unfollow</button>
        ):(<button onClick={()=>handleFollow(username)} className="follow-button">Follow</button>)}
      </div>
    </div>
  );
};

export default User;
