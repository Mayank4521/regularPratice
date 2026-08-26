import react, { useState } from "react";
import "../style/profile.scss";
import { useAuth } from "../hooks/useAuth";
import Nav from "../../shared/Nav";

const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="profile-page">
        <section className="profile-card">
          <h1>Loading...</h1>
        </section>
      </main>
    );
  }
  if (!user) {
    return (
      <>
        <Nav />
        <main className="profile-page">
          <section className="profile-card">
            <h1>User not found</h1>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
    <Nav />
    <main className="profile-page">
      <section className="profile-card">
        <div className="profile-top">
          <img
            className="profile-image"
            src={user.profileImage}
            alt={user.username}
          />

          <div className="profile-info">
            <h1>{user.username}</h1>

            <p className="email">{user.email}</p>

            <p className="bio">{user.bio}</p>
          </div>
        </div>
      </section>
    </main>
    </>
  );
};

export default Profile;
