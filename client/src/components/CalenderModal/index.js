import React, { useEffect, useState } from "react";
import CreateEditEventModal from "./CreateEditEventModal";
import FriendsCarousel from "../FriendsCarousel";
import "./styles.css";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import api from "../../api";
import FriendCard from "../FriendsCarousel/FriendCard";
import { toast } from "react-toastify";

const CalenderModal = ({
  eventInfo,
  handleSubmit,
  allFriends,
  loading,
  handleDeleteEvent,
}) => {
  const [mode, setMode] = useState("VIEW" || "EDIT" || "CREATE");
  const { authState } = useContext(AuthContext);
  const [eventOwner, setEventOwner] = useState(null);
  const [eventInvites, setEventInvites] = useState([]);
  const [invitesMapping, setInvitesMapping] = useState(null);

  const notifyError = (msg) => toast.error(msg);

  const parsedDate = () => {
    if (eventInfo.start) {
      const hours = eventInfo.start.toString().match(/[0-9]{2}:[0-9]{2}/g);
      return hours[0];
    }
    return null;
  };

  useEffect(() => {
    const fetchEventOwner = async () => {
      try {
        const { data } = await api.get(`/usuario/${eventInfo.fkIdDono}`);
        setEventOwner(data);
      } catch (e) {
        setEventOwner("ERROR");
      }
    };

    const fetchEventInvites = async () => {
      try {
        const { data } = await api.get(
          `/eventos/${eventInfo.idEvento}/convites`
        );
        setEventInvites(data);
      } catch (e) {
        notifyError("Houve algum erro. Por favor, atualize a página.");
      }
    };

    eventInfo.fkIdDono !== authState.userInfo.idUsuario && fetchEventOwner();
    eventInfo.idEvento && fetchEventInvites();
  }, [eventInfo]);

  useEffect(() => {
    setInvitesMapping(
      eventInvites.reduce((mapping, invite) => {
        mapping[invite.fkIdUsuario] = invite.status;
        return mapping;
      }, {})
    );
  }, [eventInvites]);

  if (mode !== "VIEW")
    return (
      <CreateEditEventModal
        eventInfo={eventInfo}
        mode={mode}
        setMode={setMode}
        handleSubmit={handleSubmit}
        allFriends={allFriends}
        loading={loading}
        handleDeleteEvent={handleDeleteEvent}
      />
    );

  return (
    <div className="calender-modal-container">
      <div
        className="calender-modal-background"
        style={{ backgroundColor: eventInfo.backgroundColor || "#3788d8" }}
      />
      <div className="calender-modal-styling" />

      <div className="calender-modal-content">
        <div className="modal-event-title calender-modal-field-value">
          <h1>{eventInfo.title}</h1>
        </div>

        <div className="event-field">
          <h2>Horário: </h2>
          <p className="modal-event-start calender-modal-field-value">
            {parsedDate() || "--:--"}
          </p>
        </div>

        <div className="event-field">
          <h2>Duração: </h2>
          <p className="modal-event-duration calender-modal-field-value">
            {eventInfo.duration || "--:--"}
          </p>
        </div>

        <div className="event-field">
          <h2>Local: </h2>
          <p className="modal-event-place calender-modal-field-value">
            {eventInfo.place || "-"}
          </p>
        </div>

        <div className="event-field">
          <h2>Amigos Convidados: </h2>
          <div className="carousel-container">
            <FriendsCarousel
              loading={false}
              friends={eventInfo.invitedFriends || []}
              invitesMapping={invitesMapping}
            />
          </div>
        </div>

        <div className="event-field">
          <h2>Descrição: </h2>
          <p className="modal-event-description calender-modal-field-value">
            {eventInfo.description || "Sem descrição"}
          </p>
        </div>
        {(authState.userInfo.idUsuario === eventInfo.fkIdDono && (
          <button
            className="calender-modal-edit-event-button"
            onClick={() => {
              setMode("EDIT");
            }}
          >
            Editar <i className="fas fa-edit" />
          </button>
        )) ||
          (eventOwner && (
            <div className="event-field">
              <h2>Dono do Evento:</h2>
              <FriendCard friend={eventOwner} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CalenderModal;
