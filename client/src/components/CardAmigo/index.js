import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api";
import AvatarPlaceholder from "../../img/avatar-placeholder.png";
import { AuthContext } from "../../providers/AuthProvider";
import ModalOverlay from "../ModalOverlay";
import "./styles.css";

const CardAmigo = ({
  userInfo,
  mode,
  authUserFriendlistIds,
  loadingAuthUserFriendList,
}) => {
  const { idUsuario, avatarUrl, nome, sobrenome, descricao } = userInfo;
  const { authState, setAuthState } = useContext(AuthContext);
  const [idsOfUsersThatAddedYou, setIdsOfUsersThatAddedYou] = useState([]);
  const [idsOfUsersThatYouAdded, setIdsOfUsersThatYouAdded] = useState([]);
  const [
    confirmDeleteFriendModalVisible,
    setConfirmDeleteteFriendModalVisible,
  ] = useState(false);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (authState.userInfo && authState.userInfo.idUsuario) {
      setIdsOfUsersThatAddedYou(
        authState.userInfo.requisicoesAmigos.map((user) => user.idUsuario)
      );
      setIdsOfUsersThatYouAdded(
        authState.userInfo.amigosRequisitados.map((user) => user.idUsuario)
      );
    } else {
      setIdsOfUsersThatAddedYou([]);
      setIdsOfUsersThatYouAdded([]);
    }
  }, [authState]);

  const inviteEndpoint = `/amigos/convites?idUsuarioReq=${idUsuario}`;

  const updateAuthUserInfo = async () => {
    const { data } = await api.get(`/usuario`);
    setAuthState(Object.assign({}, authState, { userInfo: data[0] }));
  };

  const handleAddFriend = async () => {
    if (loading) return;
    try {
      setLoading(true);
      await api.post(inviteEndpoint);
      await updateAuthUserInfo();
    } catch (e) {
      setLoading(false);
      alert("Ocorreu um erro. Atualize a página e tente novamente.");
    }
  };

  const handleDeleteFriend = async () => {
    if (loading) return;
    try {
      setLoading(true);
      setConfirmDeleteteFriendModalVisible(false);
      await api.delete(inviteEndpoint);
      await updateAuthUserInfo();
    } catch (e) {
      setLoading(false);
      setConfirmDeleteteFriendModalVisible(false);
      alert("Ocorreu um erro. Atualize a página e tente novamente.");
    }
  };

  const handleAcceptFriend = async () => {
    if (loading) return;
    try {
      setLoading(true);
      await api.patch(inviteEndpoint);
      await updateAuthUserInfo();
    } catch (e) {
      setLoading(false);
      alert("Ocorreu um erro. Atualize a página e tente novamente.");
    }
  };

  const handleDeclineFriend = async () => {
    if (loading) return;
    try {
      setLoading(true);
      await api.delete(inviteEndpoint);
      await updateAuthUserInfo();
      handleCloseConfirmDeleteFriendModal();
    } catch (e) {
      setLoading(false);
      alert("Ocorreu um erro. Atualize a página e tente novamente.");
    }
  };

  const CardSpinner = () => {
    return (
      <div className="w-100 text-center text-white">
        <i className="fas fa-spinner fa-2x" />
      </div>
    );
  };

  const InviteButtons = () => {
    if (loading || loadingAuthUserFriendList) return <CardSpinner />;
    return (
      <>
        <button
          type="button"
          className="btn btn-success my-card-btn"
          onClick={handleAcceptFriend}
        >
          <i className="fas fa-check"></i>
        </button>
        <button
          type="button"
          className="btn btn-danger my-card-btn"
          onClick={handleDeclineFriend}
        >
          <i className="fas fa-times-circle"></i>
        </button>
      </>
    );
  };

  const SearchButton = () => {
    if (loading || loadingAuthUserFriendList) return <CardSpinner />;
    return (
      <>
        {(authUserFriendlistIds.includes(idUsuario) && (
          <p className="text-success">Já é seu amigo.</p>
        )) || (
          <button
            type="button"
            className="btn btn-primary my-bg-orange-1 my-card-btn"
            onClick={handleAddFriend}
          >
            <i className="fas fa-user-plus"></i>
          </button>
        )}
      </>
    );
  };

  const FriendlistButton = () => {
    if (loading || loadingAuthUserFriendList) return <CardSpinner />;
    return (
      <button
        type="button"
        className="btn btn-primary btn-danger my-card-btn"
        onClick={() => setConfirmDeleteteFriendModalVisible(true)}
      >
        <i className="fas fa-user-alt-slash"></i>
      </button>
    );
  };

  const handleCloseConfirmDeleteFriendModal = () => {
    setConfirmDeleteteFriendModalVisible(false);
  };

  const ConfirmDeleteFriendModal = () => {
    return (
      <ModalOverlay
        handleCloseModal={handleCloseConfirmDeleteFriendModal}
        closeButton={false}
      >
        <div className="container p-3 bg-white anim-fade-in my-auto">
          <h3 className="my-blue-1">Tem certeza disso?</h3>
          <div className="d-flex justify-content-around">
            <button
              className="btn btn-primary"
              onClick={handleCloseConfirmDeleteFriendModal}
            >
              Cancelar
            </button>
            <button className="btn btn-danger" onClick={handleDeleteFriend}>
              Confirmar
            </button>
          </div>
        </div>
      </ModalOverlay>
    );
  };

  const getSearchCardMessageOrButton = () => {
    if (loadingAuthUserFriendList) return null;
    if (authUserFriendlistIds.includes(idUsuario)) {
      return <p className="text-success">Já é seu amigo.</p>;
    } else if (idsOfUsersThatAddedYou.includes(idUsuario)) {
      return <InviteButtons />;
    } else if (idsOfUsersThatYouAdded.includes(idUsuario)) {
      return <p className="text-success">Já adicionado.</p>;
    } else {
      return <SearchButton />;
    }
  };

  const getFriendlistCardMessageOrButton = () => {
    if (loadingAuthUserFriendList) return null;
    if (authState.userInfo && idUsuario === authState.userInfo.idUsuario) {
      return <p className="text-success">Você.</p>;
    }
    if (authUserFriendlistIds.includes(idUsuario)) {
      return <p className="text-success">Já é seu amigo.</p>;
    } else if (
      authUserFriendlistIds[0] !== "INIT" &&
      idsOfUsersThatAddedYou.includes(idUsuario)
    ) {
      return (
        <div className="d-flex flex-column">
          <p
            className="text-success m-0 p-1"
            style={{ borderTop: "1px white solid" }}
          >
            Quer ser seu amigo
          </p>
          <div className="d-flex justify-content-center" style={{ gap: "5px" }}>
            <InviteButtons />
          </div>
        </div>
      );
    } else if (
      authUserFriendlistIds[0] !== "INIT" &&
      idsOfUsersThatYouAdded.includes(idUsuario)
    ) {
      return <p className="text-success">Já adicionado.</p>;
    } else if (authUserFriendlistIds[0] !== "INIT") {
      return (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <p
            className="text-primary m-0 p-1"
            style={{ borderTop: "1px white solid" }}
          >
            Adicionar como amigo?
          </p>
          <SearchButton />
        </div>
      );
    } else {
      return null;
    }
  };

  if (mode === "OTHER-PROFILE") {
    return getFriendlistCardMessageOrButton();
  }

  return (
    <>
      {confirmDeleteFriendModalVisible && <ConfirmDeleteFriendModal />}
      <li className="my-text-align my-friend-card d-flex my-2 mx-auto rounded">
        <div className="my-friend-info">
          <div className="row position-relative">
            <div className="col-lg-3 col-md-3 col-12">
              <img
                alt="user"
                className="profile-photo-lg"
                src={avatarUrl || AvatarPlaceholder}
              />
            </div>
            <div className="col-lg-7 col-md-7 col-12 mx-auto">
              <h5>
                <Link className="profile-link" to={`/usuario/${idUsuario}`}>
                  {nome} {sobrenome}
                </Link>
              </h5>
              <p>{descricao}</p>
            </div>
          </div>
        </div>
        {authState.userInfo && (
          <div className="my-card-controls">
            {(loadingAuthUserFriendList && <CardSpinner />) ||
              (mode === "SEARCH" && getSearchCardMessageOrButton()) ||
              (mode === "FRIENDLIST" && !id && FriendlistButton()) ||
              (mode === "FRIENDLIST" &&
                id !== authState.userInfo.idUsuario &&
                getFriendlistCardMessageOrButton()) ||
              (mode === "INVITES" && <InviteButtons />)}
          </div>
        )}
      </li>
    </>
  );
};

export default CardAmigo;
