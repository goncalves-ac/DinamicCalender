import React from "react";
import AvatarPlaceholder from "../../img/avatar-placeholder.png";
import "./styles.css";

const CardAmigo = ({ userInfo, search }) => {
  const { idUsuario, avatarUrl, nome, sobrenome, descricao } = userInfo;

  return (
    <div className="nearby-user my-text-align">
      <div className="row position-relative">
        <div className="col-lg-3 col-md-3 col-12">
          <img
            alt="user"
            className="profile-photo-lg"
            src={
              (avatarUrl && `${process.env.REACT_APP_API_URL}/${avatarUrl}`) ||
              AvatarPlaceholder
            }
          />
        </div>
        <div className="col-lg-7 col-md-7 col-12">
          <h5>
            <a className="profile-link" href="#">
              {nome} {sobrenome}
            </a>
          </h5>
          <p>{descricao}</p>
        </div>

        {(search && (
          <button
            type="button"
            className="btn btn-primary my-bg-orange-1 btn-height my-btn-position"
          >
            <i className="fas fa-user-plus"></i>
          </button>
        )) || (
          <button
            type="button"
            className="btn btn-primary btn-danger btn-height my-btn-position"
          >
            <i className="fas fa-user-alt-slash"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default CardAmigo;
