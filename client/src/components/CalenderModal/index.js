import React, { useState } from "react";
import CreateEditEventModal from "./CreateEditEventModal";
import FriendsCarousel from "../FriendsCarousel";
import "./styles.css";

const CalenderModal = ({
  eventInfo,
  handleSubmit,
  allFriends,
  setCalendarState,
}) => {
  const [mode, setMode] = useState("VIEW" || "EDIT" || "CREATE");

  const parsedDate = () => {
    if (eventInfo.start) {
      const hours = eventInfo.start.toString().match(/[0-9]{2}:[0-9]{2}/g);
      return hours[0];
    }
    return null;
  };

  if (mode !== "VIEW")
    return (
      <CreateEditEventModal
        eventInfo={eventInfo}
        mode={mode}
        setMode={setMode}
        handleSubmit={handleSubmit}
        allFriends={allFriends}
        setCalendarState={setCalendarState}
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
            />
          </div>
        </div>

        <div className="event-field">
          <h2>Descrição: </h2>
          <p className="modal-event-description calender-modal-field-value">
            {eventInfo.description || "Sem descrição"}
          </p>
        </div>

        <button
          className="calender-modal-edit-event-button"
          onClick={() => setMode("EDIT")}
        >
          Editar <i className="fas fa-edit" />
        </button>
      </div>
    </div>
  );
};

export default CalenderModal;
