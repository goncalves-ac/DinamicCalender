import React, { useContext } from "react";
import CardAmigo from "../CardAmigo";
import "./styles.css";
import avatarPlaceholder from "../../img/avatar-placeholder.png";
import useAuthUserFriendlist from "../../hooks/useAuthUserFriendlist";
import { AuthContext } from "../../providers/AuthProvider";

const DadosUsuario = ({ userInfo, otherUserProfile }) => {
  const { authUserFriendlistIds } = useAuthUserFriendlist();
  const { authState } = useContext(AuthContext);

  return (
    <div className="container mt-2">
      <div className="span3 well">
        <div className="text-center my-user-data-profile-container mt-5">
          <div>
            <img
              className="fotoPerfil"
              src={
                (userInfo.avatarUrl &&
                  `${process.env.REACT_APP_API_URL}/${userInfo.avatarUrl}`) ||
                avatarPlaceholder
              }
              alt={`Avatar de ${userInfo.nome}`}
            />
          </div>
          <h3 className="my-blue-1 my-3">
            {userInfo.nome} {userInfo.sobrenome}
          </h3>
          <p className="container-sm text-center text-light col-lg-5 col-md-8 col-sm-11">
            {userInfo.descricao && `"${userInfo.descricao}"`}
          </p>
          <>
            {authState.userInfo && otherUserProfile && (
              <CardAmigo
                userInfo={userInfo}
                mode="OTHER-PROFILE"
                authUserFriendlistIds={authUserFriendlistIds}
              />
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default DadosUsuario;
