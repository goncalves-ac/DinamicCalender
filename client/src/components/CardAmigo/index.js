import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api";
import useAuthUserFriendlist from "../../hooks/useAuthUserFriendlist";
import AvatarPlaceholder from "../../img/avatar-placeholder.png";
import { AuthContext } from "../../providers/AuthProvider";
import ModalOverlay from "../ModalOverlay";
import "./styles.css";

const CardAmigo = ({ userInfo, mode }) => {
  const { idUsuario, avatarUrl, nome, sobrenome, descricao } = userInfo;
  const { authState, setAuthState } = useContext(AuthContext);
  const [idsOfUsersThatAddedYou, setIdsOfUsersThatAddedYou] = useState([]);
  const [idsOfUsersThatYouAdded, setIdsOfUsersThatYouAdded] = useState([]);
  const [
    confirmDeleteFriendModalVisible,
    setConfirmDeleteteFriendModalVisible,
  ] = useState(false);

  const { id } = useParams();

  const {
    authUserFriendlistIds,
    loadingAuthUserFriendList,
  } = useAuthUserFriendlist();

  useEffect(() => {
    if (authState.userInfo && authState.userInfo.idUsuario) {
      setIdsOfUsersThatAddedYou(
        authState.userInfo.requisicoesAmigos.map((user) => user.idUsuario)
      );
      setIdsOfUsersThatYouAdded(
        authState.userInfo.amigosRequisitados.map((user) => user.idUsuario)
      );
    }
  }, [authState]);

  const inviteEndpoint = `/amigos/convites?idUsuarioReq=${idUsuario}`;

  const updateAuthUserInfo = async () => {
    const { data } = await api.get(`/usuario`);
    setAuthState(Object.assign({}, authState, { userInfo: data[0] }));
  };

  const handleAddFriend = async () => {
    try {
      await api.post(inviteEndpoint);
      await updateAuthUserInfo();
    } catch (e) {
      alert("Ocorreu um erro. Atualize a página e tente novamente.");
    }
  };

  const handleDeleteFriend = async () => {
    try {
      await api.delete(inviteEndpoint);
      await updateAuthUserInfo();
    } catch (e) {
      alert("Ocorreu um erro. Atualize a página e tente novamente.");
    }
  };

  const handleAcceptFriend = async () => {
    try {
      await api.patch(inviteEndpoint);
      await updateAuthUserInfo();
    } catch (e) {
      alert("Ocorreu um erro. Atualize a página e tente novamente.");
    }
  };

  const handleDeclineFriend = async () => {
    try {
      await api.delete(inviteEndpoint);
      await updateAuthUserInfo();
      handleCloseConfirmDeleteFriendModal();
    } catch (e) {
      alert("Ocorreu um erro. Atualize a página e tente novamente.");
    }
  };

  const InviteButtons = () => {
    return (
      <div className="invite-buttons-container mt-1">
        <button
          type="button"
          className="btn btn-success btn-height my-card-btn"
          onClick={handleAcceptFriend}
        >
          <i className="fas fa-check"></i>
        </button>
        <button
          type="button"
          className="btn btn-danger btn-height my-card-btn"
          onClick={handleDeclineFriend}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    );
  };

  const SearchButton = () => {
    return (
      <>
        {(authUserFriendlistIds.includes(idUsuario) && (
          <p className="ml-auto mb-0 text-success">Já é seu amigo.</p>
        )) || (
          <button
            type="button"
            className="btn btn-primary my-bg-orange-1 btn-height my-card-btn mt-0 ml-auto"
            onClick={handleAddFriend}
          >
            <i className="fas fa-user-plus"></i>
          </button>
        )}
      </>
    );
  };

  const FriendlistButton = () => {
    return (
      <button
        type="button"
        className="btn btn-primary btn-danger btn-height my-card-btn mt-0 ml-auto"
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
      return <p className="ml-auto mb-0 text-success">Já é seu amigo.</p>;
    } else if (idsOfUsersThatAddedYou.includes(idUsuario)) {
      return <InviteButtons />;
    } else if (idsOfUsersThatYouAdded.includes(idUsuario)) {
      return <p className="ml-auto mb-0 text-success">Já adicionado.</p>;
    } else {
      return <SearchButton />;
    }
  };

  const getFriendlistCardMessageOrButton = () => {
    if (loadingAuthUserFriendList) return null;
    if (authState.userInfo && idUsuario === authState.userInfo.idUsuario) {
      return <p className="ml-auto mt-auto mb-0 text-success">Você.</p>;
    }
    if (authUserFriendlistIds.includes(idUsuario)) {
      return <p className="ml-auto mb-0 text-success">Já é seu amigo.</p>;
    } else if (
      authUserFriendlistIds.length > 0 &&
      idsOfUsersThatAddedYou.includes(idUsuario)
    ) {
      return <InviteButtons />;
    } else if (
      authUserFriendlistIds.length > 0 &&
      idsOfUsersThatYouAdded.includes(idUsuario)
    ) {
      return <p className="ml-auto mb-0 text-success">Já adicionado.</p>;
    } else {
      return <SearchButton />;
    }
  };

  if (mode === "OTHER-PROFILE") {
    return getFriendlistCardMessageOrButton();
  }

  return (
    <>
      {confirmDeleteFriendModalVisible && <ConfirmDeleteFriendModal />}
      <div className="nearby-user my-text-align">
        <div className="row position-relative">
          <div className="col-lg-3 col-md-3 col-12">
            <img
              alt="user"
              className="profile-photo-lg"
              src={
                (avatarUrl &&
                  `${process.env.REACT_APP_API_URL}/${avatarUrl}`) ||
                AvatarPlaceholder
              }
            />
          </div>
          <div className="col-lg-7 col-md-7 col-12">
            <h5>
              <Link className="profile-link" to={`/usuario/${idUsuario}`}>
                {nome} {sobrenome}
              </Link>
            </h5>
            <p>{descricao}</p>
          </div>

          {authState.userInfo && (
            <>
              {(mode === "SEARCH" && getSearchCardMessageOrButton()) ||
                (mode === "FRIENDLIST" && !id && FriendlistButton()) ||
                (mode === "FRIENDLIST" &&
                  id !== authState.userInfo.idUsuario &&
                  getFriendlistCardMessageOrButton()) ||
                (mode === "INVITES" && <InviteButtons />)}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CardAmigo;
