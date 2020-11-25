import React, { useEffect, useState } from "react";
import CardAmigo from "../CardAmigo";
import CardConviteEvento from "../CardConviteEvento";
import "./ListaAmigos.css";

const ListaConvites = ({
  friendInvites,
  otherUsers,
  authUserFriendlistIds,
  loadingAuthUserFriendList,
  eventInvites,
  loadingEventInvites,
}) => {
  const [pendingFriendInvites, setPendingFriendInvites] = useState([]);

  useEffect(() => {
    const otherUsersInviteIds = friendInvites.map(
      (invite) => invite.idUsuario1
    );
    const pendingInvites = otherUsers.filter((user) =>
      otherUsersInviteIds.includes(user.idUsuario)
    );
    setPendingFriendInvites(pendingInvites);
  }, [friendInvites, otherUsers]);

  return (
    <div className="d-flex my-profile-page-content-container-sizing">
      <div className="col-6 my-invites">
        <div className="people-nearby ">
          <h2 className="my-invite-section-title my-blue-1">
            Convites de amizade
          </h2>
          {(loadingAuthUserFriendList && (
            <div className="w-100 text-center">
              <i className="fas fa-spinner fa-3x my-blue-1" />
            </div>
          )) || (
            <ul>
              {pendingFriendInvites.map((user) => (
                <CardAmigo
                  key={user.idUsuario}
                  userInfo={user}
                  mode="INVITES"
                  authUserFriendlistIds={authUserFriendlistIds}
                  loadingAuthUserFriendList={loadingAuthUserFriendList}
                />
              ))}
            </ul>
          )}
          {!loadingAuthUserFriendList && friendInvites.length < 1 && (
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
          {(loadingEventInvites && (
            <div className="w-100 text-center">
              <i className="fas fa-spinner fa-3x my-blue-1" />
            </div>
          )) || (
            <ul>
              {eventInvites.map((eventInfo) => (
                <CardConviteEvento
                  key={eventInfo.id_evento}
                  eventInfo={eventInfo}
                />
              ))}
            </ul>
          )}
          {!loadingEventInvites && eventInvites.length < 1 && (
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
