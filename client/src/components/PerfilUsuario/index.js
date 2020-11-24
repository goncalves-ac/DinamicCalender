import React from "react";
import "./PerfilUsuario.css";
import ListaEventos from "../ListaEventos";

const PerfilUsuario = () => {
  return (
    <div className="d-flex justify-content-around align-self-center">
      <div className="container mt-3 mb-5">
        <h3 className="my-blue-1 my-bolder my-text-align">
          <strong>Eventos</strong>
        </h3>
        <div className="row">
          <ListaEventos />
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;
