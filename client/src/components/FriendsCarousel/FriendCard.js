import React from "react";
import { Link } from "react-router-dom";

import AvatarPlaceholder from "../../img/avatar-placeholder.png";

const FriendCard = ({ friend, mode, uninviteCallback, status }) => {
  return (
    <div className="carousel-friend-card">
      {mode === "CREATE" && (
        <span
          className="uninvite-friend-button"
          onClick={() => uninviteCallback(friend)}
        >
          <i className="fas fa-user-minus" />
        </span>
      )}
      {mode !== "CREATE" && status && (
        <>
          {(status === "ACCEPTED" && (
            <p className="my-invite-status text-success">Aceito</p>
          )) ||
            (status === "PENDING" && (
              <p className="my-invite-status text-primary">Pendente</p>
            )) ||
            (status === "REJECTED" && (
              <p className="my-invite-status text-danger">Rejeitado</p>
            ))}
        </>
      )}
      <div className="inner-card-container">
        <img
          className="carousel-card-avatar"
          src={friend.avatarUrl || AvatarPlaceholder}
          alt={`Avatar do Usuário`}
        />
        <h3 className="carousel-card-user-name">{friend.nome}</h3>
        <Link
          className="carousel-check-profile-btn"
          to={`/usuario/${friend.idUsuario}`}
          target="_blank"
        >
          Ver Perfil
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;
