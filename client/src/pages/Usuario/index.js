import React, { useEffect, useState } from "react";
import "./Usuario.css";

import PerfilUsuario from "../../components/PerfilUsuario";
import ListaAmigos from "../../components/ListaAmigos";
import ListaBusca from "../../components/ListaBusca";
import Nav from "../../components/Nav";
import DadosUsuario from "../../components/DadosUsuario";

import ListaConvites from "../../components/ListaConvites";
import api from "../../api";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAuthUserFriendlist from "../../hooks/useAuthUserFriendlist";

export default function Usuario({ userInfo }) {
  const [eventInvites, setEventInvites] = useState([]);
  const [loadingEventInvites, setLoadingEventInvites] = useState(true);
  const [totalInvites, setTotalInvites] = useState(null);
  const { authState, setAuthState } = useContext(AuthContext);
  const [authUserNextEvents, setAuthUserNextEvents] = useState(null);

  const {
    authUserFriendList,
    authUserPendingInvites,
    authUserFriendlistIds,
    loadingAuthUserFriendList,
  } = useAuthUserFriendlist();

  const fetchNextEvents = async () => {
    try {
      const { data } = await api.get("/eventos?recent=true&limit=3");
      setAuthUserNextEvents(data);
    } catch (e) {
      alert(
        "Houve um ao buscar os próximos eventos do usuário. Por favor atualize a página."
      );
      setAuthUserNextEvents([]);
    }
  };

  const fetchEventInvites = async () => {
    try {
      const { data } = await api.get(
        `/eventos/convites?idUser=${authState.userInfo.idUsuario}&status=PENDING`
      );
      const pendingEventInvitesEventIds = data.map(
        (invite) => invite.fkIdEvento
      );

      const pendingEventInvitesEventsInfo = authState.userInfo.eventosAlheios.filter(
        (event) => pendingEventInvitesEventIds.includes(event.id_evento)
      );

      setEventInvites(pendingEventInvitesEventsInfo);
      setLoadingEventInvites(false);
    } catch (e) {
      alert(
        "Houve um ao buscar os próximos eventos do usuário. Por favor atualize a página."
      );
      setLoadingEventInvites(false);
    }
  };

  useEffect(() => {
    setTotalInvites(authUserPendingInvites.length + eventInvites.length);
  }, [authUserPendingInvites, eventInvites]);

  useEffect(() => {
    if (authState.userInfo) {
      fetchNextEvents();
      fetchEventInvites();
    }
  }, [authState]);

  const updateAuthUserStateWhenHasInvites = async () => {
    if (totalInvites && totalInvites > 0) {
      const { data } = await api.get("/usuario");
      setAuthState(Object.assign({}, authState, { userInfo: data[0] }));
    }
  };

  return (
    <section>
      <Nav />
      <DadosUsuario
        userInfo={userInfo}
        authUserFriendlistIds={authUserFriendlistIds}
      />
      <div className="my-5 w-100">
        <ul
          className="nav nav-tabs font-weight-bold"
          id="main-tab"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <a
              aria-controls="timeline"
              aria-selected="true"
              className="nav-link active"
              data-toggle="tab"
              href="#timeline"
              id="home-tab"
              role="tab"
            >
              {" "}
              <i className="fas fa-stream"></i> Timeline{" "}
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              aria-controls="friends"
              aria-selected="false"
              className="nav-link"
              data-toggle="tab"
              href="#friends"
              id="profile-tab"
              role="tab"
            >
              {" "}
              <i className="fas fa-users"></i> Amigos{" "}
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              aria-controls="search"
              aria-selected="false"
              className="nav-link"
              data-toggle="tab"
              href="#search"
              id="search-tab"
              role="tab"
            >
              {" "}
              <i className="fas fa-search"></i> Buscar{" "}
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              aria-controls="invites"
              aria-selected="false"
              className="nav-link"
              data-toggle="tab"
              href="#invites"
              id="search-tab"
              role="tab"
              onClick={updateAuthUserStateWhenHasInvites}
            >
              {totalInvites > 0 && (
                <div className="my-invite-badge-number">{totalInvites}</div>
              )}
              <i
                className={`fas fa-envelope ${
                  (totalInvites && totalInvites > 0 && "text-danger") || ""
                }`}
              ></i>
              Convites
            </a>
          </li>
        </ul>
        <div className="tab-content min-vh-50" id="myTabContent">
          <div
            aria-labelledby="timeline"
            className="tab-pane fade show active w-100 p-3"
            id="timeline"
            role="tabpanel"
          >
            <PerfilUsuario self={true} nextEvents={authUserNextEvents} />
          </div>

          <div
            aria-labelledby="friends"
            className="tab-pane fade"
            id="friends"
            role="tabpanel"
          >
            <ListaAmigos
              friendList={authUserFriendList}
              authUserFriendlistIds={authUserFriendlistIds}
              loadingAuthUserFriendList={loadingAuthUserFriendList}
            />
          </div>

          <div
            aria-labelledby="search-tab"
            className="tab-pane fade"
            id="search"
            role="tabpanel"
          >
            <ListaBusca authUserFriendlistIds={authUserFriendlistIds} />
          </div>

          <div
            aria-labelledby="invites"
            className="tab-pane fade"
            id="invites"
            role="tabpanel"
          >
            <ListaConvites
              friendInvites={authUserPendingInvites}
              otherUsers={userInfo.requisicoesAmigos}
              authUserFriendlistIds={authUserFriendlistIds}
              loadingAuthUserFriendList={loadingAuthUserFriendList}
              eventInvites={eventInvites}
              loadingEventInvites={loadingEventInvites}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
