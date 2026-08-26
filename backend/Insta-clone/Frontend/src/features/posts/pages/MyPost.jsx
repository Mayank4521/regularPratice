import React, { useEffect } from "react";
import "../style/feed.scss";
import Post from "../components/post";
import { usePost } from "../hooks/usePost";
import Nav from "../../shared/Nav.jsx";

const MyPost = () => {
  const { loading, posts, handleGetPost, handleLike, handleUnLike } = usePost();

  useEffect(() => {
    handleGetPost();
  }, []);

  if (loading || !posts) {
    return (
      <main>
        <h1>Feed is loading...</h1>
      </main>
    );
  }

  return (
    <main className="feed-page">
      <Nav />
      <div className="feed">
        <div className="posts">
          {posts.map((post) => {
            return (
              <Post
                key={post._id}
                user={post.userId}
                post={post}
                handleLike={async (id) => {
                  await handleLike(id);
                  await handleGetPost();
                }}
                handleUnLike={async (id) => {
                  await handleUnLike(id);
                  await handleGetPost();
                }}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default MyPost;
