import React from "react";
import Loading from "../../pages/Loading";
import CardEvento from "../CardEvento";
import "./ListaEvento.css";

const ListaEventos = ({ nextEvents }) => {
  const LoadingSpinner = () => {
    return (
      <div className="mt-2 p3 w-100 d-flex justify-content-center">
        <i className="fas fa-spinner my-blue-1 fa-3x" />
      </div>
    );
  };
  return (
    <div className="col-md-6 offset-md-3">
      {nextEvents === null && <LoadingSpinner />}
      <ul className="timeline">
        {nextEvents !== null &&
          nextEvents.length > 0 &&
          nextEvents.map((event) => (
            <CardEvento key={event.id_evento} eventInfo={event} />
          ))}
      </ul>
    </div>
  );
};

export default ListaEventos;
