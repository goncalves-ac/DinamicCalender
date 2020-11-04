import React from "react";
import { Link } from "react-router-dom";

const FriendCard = ({ friend }) => {
  return (
    <div className="carousel-friend-card">
      <div className="inner-card-container">
        <img
          className="carousel-card-avatar"
          src={friend.avatarUrl}
          alt={friend.name}
        />
        <h3 className="carousel-card-user-name">{friend.name}</h3>
        <Link className="carousel-check-profile-btn" to={friend.profileUrl}>
          Ver Perfil
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;
