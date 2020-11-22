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

export default function Usuario({ userInfo }) {
  const [otherUserInvites, setOtherUserInvites] = useState([]);
  const [friends, setFriends] = useState([]);
  const { authState, setAuthState } = useContext(AuthContext);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const { data } = await api.get("/amigos");

        const otherInvites = data.filter(
          (invite) =>
            invite.status === "PENDING" &&
            invite.idUsuario1 !== userInfo.idUsuario
        );
        setOtherUserInvites(otherInvites);

        const acceptedFriends = data.filter(
          (invite) => invite.status === "ACCEPTED"
        );
        const acceptedFriendsIdUsuario1List = acceptedFriends.map(
          (user) => user.idUsuario1
        );
        const acceptedFriendsIdUsuario2List = acceptedFriends.map(
          (user) => user.idUsuario2
        );

        const friendList = [
          ...userInfo.amigosRequisitados,
          ...userInfo.requisicoesAmigos,
        ].filter(
          (amigo) =>
            acceptedFriendsIdUsuario1List.includes(amigo.idUsuario) ||
            acceptedFriendsIdUsuario2List.includes(amigo.idUsuario)
        );

        setFriends(friendList);
      } catch (e) {}
    };
    fetchFriends();
  }, [authState]);

  const updateAuthUserStateWhenHasInvites = async () => {
    if (otherUserInvites.length > 0) {
      const { data } = await api.get("/usuario");
      setAuthState(Object.assign({}, authState, { userInfo: data[0] }));
    }
  };

  return (
    <section>
      <Nav />
      <DadosUsuario userInfo={userInfo} />
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
              {" "}
              <i
                className={`fas fa-envelope ${
                  (otherUserInvites.length > 0 && "text-danger") || ""
                }`}
              ></i>
              {otherUserInvites.length > 0 && (
                <span className="badge badge-danger">
                  {otherUserInvites.length}
                </span>
              )}{" "}
              Convites{" "}
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
            <ListaAmigos friendList={friends} />
          </div>

          <div
            aria-labelledby="search-tab"
            className="tab-pane fade"
            id="search"
            role="tabpanel"
          >
            <ListaBusca />
          </div>

          <div
            aria-labelledby="invites"
            className="tab-pane fade"
            id="invites"
            role="tabpanel"
          >
            <ListaConvites
              invites={otherUserInvites}
              otherUsers={userInfo.requisicoesAmigos}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
