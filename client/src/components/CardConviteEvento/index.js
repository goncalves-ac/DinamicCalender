import React, { useContext } from "react";
import { useState } from "react";
import api from "../../api";
import { AuthContext } from "../../providers/AuthProvider";
import parseEventStardEnd from "../../util/parseEventStartEnd";
import "./styles.css";

const CardConviteEvento = ({ eventInfo }) => {
  const {
    id_evento,
    titulo,
    inicio,
    fim,
    local,
    descricao,
    corDeFundo,
  } = eventInfo;

  const { authState, setAuthState } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const updateAuthUserInfo = async () => {
    const { data } = await api.get(`/usuario`);
    setAuthState(Object.assign({}, authState, { userInfo: data[0] }));
  };

  const handleAcceptInvite = async () => {
    if (loading || !id_evento) return;
    try {
      setLoading(true);
      await api.put(`eventos/${id_evento}/convites?status=ACCEPTED`);
      await updateAuthUserInfo();
      setLoading(false);
    } catch (e) {
      alert(
        "Houve um problema ao aceitar o evento. Tente novamente mais tarde."
      );
      setLoading(false);
    }
  };

  const handleRejectInvite = async () => {
    if (loading || !id_evento) return;
    try {
      setLoading(true);
      await api.put(`eventos/${id_evento}/convites?status=REJECTED`);
      await updateAuthUserInfo();
      setLoading(false);
    } catch (e) {
      alert(
        "Houve um problema ao recusar o evento. Tente novamente mais tarde."
      );
      setLoading(false);
    }
  };

  return (
    <li
      className="my-event-invite-card position-relative d-flex my-event-invite-card my-2 mx-auto rounded"
      style={{ backgroundColor: corDeFundo }}
    >
      <div className="my-event-info">
        <h4>{titulo.toUpperCase()}</h4>
        <h6>{parseEventStardEnd(inicio, fim)}</h6>
        <h6>{local ? `Local: ${local}` : "Sem local definido"}</h6>
        <p>{descricao ? descricao : "Sem descrição"}</p>
      </div>

      {
        <div className="my-card-controls">
          {(loading && (
            <div className="w-100 text-center">
              <i className="fas fa-spinner fa-1x" />
            </div>
          )) || (
            <>
              <button
                onClick={handleAcceptInvite}
                className="btn btn-success my-card-btn"
              >
                <i className="fas fa-check" />
              </button>
              <button
                onClick={handleRejectInvite}
                className="btn btn-danger my-card-btn"
              >
                <i className="fas fa-times-circle" />
              </button>
            </>
          )}
        </div>
      }
    </li>
  );
};

export default CardConviteEvento;
