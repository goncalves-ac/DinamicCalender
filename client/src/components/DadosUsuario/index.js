import React from "react";
import "./FotoPerfil.css";

const DadosUsuario = ({ avatarUrl, name, surname, description }) => {
  return (
    <div className="container mt-2">
      <div className="span3 well">
        <div className="text-center">
          <div>
            <img className="fotoPerfil" src={avatarUrl} />
          </div>
          <h3 className="my-blue-1 my-3">
            {name} {surname}
          </h3>
          <p className="container-sm text-center text-light col-lg-5 col-md-8 col-sm-11">
            {description && `"${description}"`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DadosUsuario;
