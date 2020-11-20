import React, { useEffect, useState } from "react";
import CardAmigo from "../CardAmigo";
import "./ListaAmigos.css";

const ListaConvites = ({ invites, otherUsers }) => {
  const [pendingFriendInvites, setPendingFriendInvites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const otherUsersInviteIds = invites.map((invite) => invite.idUsuario1);
    const pendingInvites = otherUsers.filter((user) =>
      otherUsersInviteIds.includes(user.idUsuario)
    );
    setPendingFriendInvites(pendingInvites);
  }, [invites, otherUsers]);

  return (
    <div className="d-flex my-profile-page-content-container-sizing">
      <div className="col-6 my-invites">
        <div className="people-nearby ">
          <h2 className="my-invite-section-title my-blue-1">
            Convites de amizade
          </h2>
          {(loading && <i className="fas fa-spinner" />) ||
            pendingFriendInvites.map((user) => (
              <CardAmigo key={user.idUsuario} userInfo={user} mode="INVITES" />
            ))}
          {!loading && invites.length < 1 && (
            <p className="text-center">
              Você ainda não tem nenhum convite de amizade 😔
            </p>
          )}
        </div>
      </div>
      <div className="col-6 my-invites">
        <div className="people-nearby ">
          <h2 className="my-invite-section-title my-blue-1">
            Convites para eventos
          </h2>
          {(loading && <i className="fas fa-spinner" />) ||
            pendingFriendInvites.map((user) => (
              <CardAmigo key={user.idUsuario} userInfo={user} mode="INVITES" />
            ))}
          {!loading && invites.length < 1 && (
            <p className="text-center">
              Você ainda não tem nenhum convite para eventos 😔
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListaConvites;
