import React from "react";
import "./PerfilUsuario.css";
import ListaEventos from "../ListaEventos";

const PerfilUsuario = ({ self = false, nextEvents }) => {
  return (
    <div className="d-flex justify-content-around align-self-center full-height">
      <div className="container mt-3 mb-5">
        <h3 className="my-blue-1 my-bolder my-text-align">
          <strong>Eventos Futuros</strong>
        </h3>
        {nextEvents !== null && nextEvents.length === 0 && (
          <p className="text-danger text-center">
            {(self && "Você") || "Usuário"} não tem nenhum evento público
            futuro.
          </p>
        )}
        <div className="row">
          <ListaEventos nextEvents={nextEvents} />
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;
