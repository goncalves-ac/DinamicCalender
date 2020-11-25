import React from "react";
import parseEventStardEnd from "../../util/parseEventStartEnd";
import "./CardEvento.css";

const CardEvento = ({ eventInfo }) => {
  const { titulo, inicio, fim, local, descricao } = eventInfo;

  return (
    <li>
      <h4>{titulo && titulo.toUpperCase()}</h4>
      <h6 className="my-blue-1">{parseEventStardEnd(inicio, fim)}</h6>
      <h6>{(local && `Local: ${local}`) || "Sem local definido"}</h6>
      <p>{descricao || "Sem descrição"}</p>
    </li>
  );
};

export default CardEvento;
