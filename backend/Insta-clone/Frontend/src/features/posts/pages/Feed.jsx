import React, { useEffect } from "react";
import "../style/feed.scss";
import Post from "../components/post";
import { usePost } from "../hooks/usePost";
import Nav from "../../shared/Nav.jsx";

const Feed = () => {
  const { postLoading, post, feed, handleGetFeed, handleLike, handleUnLike } =
    usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  if (postLoading || !feed) {
    return (
      <main>
        <h1>Feed is Loading...</h1>
      </main>
    );
  }

  return (
    <main className="feed-page">
      <Nav />
      <div className="feed">
        <div className="posts">
          {feed.map((post) => {
            return (
              <Post
                key={post._id}
                user={post.userId}
                post={post}
                handleLike={async (id) => {
                  await handleLike(id);
                  await handleGetFeed();
                }}
                handleUnLike={async (id) => {
                  await handleUnLike(id);
                  await handleGetFeed();
                }}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Feed;
