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
  const [totalInvites, setTotalInvites] = useState(null);
  const { authState, setAuthState } = useContext(AuthContext);

  const {
    authUserFriendList,
    authUserPendingInvites,
    authUserFriendlistIds,
    loadingAuthUserFriendList,
  } = useAuthUserFriendlist();

  useEffect(() => {
    setTotalInvites(authUserPendingInvites.length + eventInvites.length);
  }, [authUserPendingInvites, eventInvites]);

  const updateAuthUserStateWhenHasInvites = async () => {
    if (authUserPendingInvites.length > 0) {
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
            <PerfilUsuario />
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
              invites={authUserPendingInvites}
              otherUsers={userInfo.requisicoesAmigos}
              authUserFriendlistIds={authUserFriendlistIds}
              loadingAuthUserFriendList={loadingAuthUserFriendList}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
