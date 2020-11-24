import React, { useEffect, useState } from "react";
import CardAmigo from "../CardAmigo";
import "./ListaAmigos.css";

const ListaConvites = ({
  invites,
  otherUsers,
  authUserFriendlistIds,
  loadingAuthUserFriendList,
}) => {
  const [pendingFriendInvites, setPendingFriendInvites] = useState([]);

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
          {(loadingAuthUserFriendList && <i className="fas fa-spinner" />) ||
            pendingFriendInvites.map((user) => (
              <CardAmigo
                key={user.idUsuario}
                userInfo={user}
                mode="INVITES"
                authUserFriendlistIds={authUserFriendlistIds}
                loadingAuthUserFriendList={loadingAuthUserFriendList}
              />
            ))}
          {!loadingAuthUserFriendList && invites.length < 1 && (
            <p className="text-center">
              Você ainda não tem nenhum convite de amizade{" "}
              <span role="img" aria-label="Emoji Triste">
                😔
              </span>
            </p>
          )}
        </div>
      </div>
      <div className="col-6 my-invites">
        <div className="people-nearby ">
          <h2 className="my-invite-section-title my-blue-1">
            Convites para eventos
          </h2>
          {(loadingAuthUserFriendList && <i className="fas fa-spinner" />) ||
            pendingFriendInvites.map((user) => (
              <CardAmigo
                key={user.idUsuario}
                userInfo={user}
                mode="INVITES"
                authUserFriendlistIds={authUserFriendlistIds}
                loadingAuthUserFriendList={loadingAuthUserFriendList}
              />
            ))}
          {!loadingAuthUserFriendList && invites.length < 1 && (
            <p className="text-center">
              Você ainda não tem nenhum convite para eventos{" "}
              <span role="img" aria-label="Emoji Triste">
                😔
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListaConvites;
