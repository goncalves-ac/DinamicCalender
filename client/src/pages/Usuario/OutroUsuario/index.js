import React, { useEffect, useState } from "react";

import PerfilUsuario from "../../../components/PerfilUsuario";
import ListaAmigos from "../../../components/ListaAmigos";
import Nav from "../../../components/Nav";
import api from "../../../api";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Redirect, useParams } from "react-router-dom";
import DadosUsuario from "../../../components/DadosUsuario";
import Page404 from "../../Page404";
import Loading from "../../Loading";
import useAuthUserFriendlist from "../../../hooks/useAuthUserFriendlist";
import { toast } from "react-toastify";

export default function OutroUsuario() {
  const [friends, setFriends] = useState([]);
  const { authState } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({});
  const [userNextEvents, setUserNextEvents] = useState(null);
  const [userNotFound, setUserNotFound] = useState(true);
  const [loading, setLoading] = useState(true);
  const routeParams = useParams();

  const {
    authUserFriendlistIds,
    loadingAuthUserFriendList,
  } = useAuthUserFriendlist();

  const notifyError = (msg) => toast.error(msg);

  const fetchNextEvents = async () => {
    try {
      const { data } = await api.get(
        `/usuario/${routeParams.id}/eventos?recent=true&limit=3`
      );
      setUserNextEvents(data);
      setLoading(false);
    } catch (e) {
      notifyError(
        "Houve um ao buscar os próximos eventos do usuário. Por favor atualize a página."
      );
      setUserNextEvents([]);
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await api.get(`/usuario/${routeParams.id}`);
      setUserInfo(data);
      setLoading(false);
    } catch (e) {
      if (e.response.data.status === 404) {
      } else {
        notifyError("Ocorreu algum erro. Por favor atualize a página.");
      }
      setLoading(false);
    }
  };

  const fetchFriends = async () => {
    try {
      const { data } = await api.get(`/amigos?idUsuario=${routeParams.id}`);

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
      window.scrollTo(0, 0);
      setUserNotFound(false);
      setLoading(false);
    } catch (e) {
      notifyError(
        "Houve algum erro buscando os amigos do usuário. Por favor, atualize a página."
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    if (routeParams.id) {
      fetchUser();
    }
  }, [routeParams.id]);

  useEffect(() => {
    if (userInfo.idUsuario) {
      fetchNextEvents();
      fetchFriends();
      setUserNotFound(false);
      setLoading(false);
    }
  }, [authState, userInfo, routeParams.id]);

  if (
    authState.userInfo &&
    userInfo.idUsuario === authState.userInfo.idUsuario
  ) {
    return <Redirect to="/" />;
  }

  if (loading) return <Loading />;

  if (userNotFound) {
    return <Page404 />;
  }

  return (
    <section>
      <Nav />
      <DadosUsuario
        userInfo={userInfo}
        otherUserProfile={true}
        authUserFriendlistIds={authUserFriendlistIds}
        loadingAuthUserFriendList={loadingAuthUserFriendList}
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
        </ul>
        <div className="tab-content min-vh-50" id="myTabContent">
          <div
            aria-labelledby="timeline"
            className="tab-pane fade show active w-100 p-3"
            id="timeline"
            role="tabpanel"
          >
            <PerfilUsuario nextEvents={userNextEvents} />
          </div>

          <div
            aria-labelledby="friends"
            className="tab-pane fade"
            id="friends"
            role="tabpanel"
          >
            <ListaAmigos
              friendList={friends}
              authUserFriendlistIds={authUserFriendlistIds}
              loadingAuthUserFriendList={loadingAuthUserFriendList}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
