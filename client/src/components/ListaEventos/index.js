import React from "react";
import Loading from "../../pages/Loading";
import CardEvento from "../CardEvento";
import "./ListaEvento.css";

const ListaEventos = ({ nextEvents }) => {
  return (
    <div className="col-md-6 offset-md-3">
      <ul className="timeline">
        {nextEvents == null && <Loading />}
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
