import React from 'react';
import './styles.css';


const CalenderModal = ({eventInfo}) => {

  const parsedDate = () => {
    if (eventInfo.start) {
      const hours = eventInfo.start.toString().match(/[0-9]{2}:[0-9]{2}/g);
      return hours[0];
    }
    return null;
    
  }

  const parsedFriends = () => {
    if (eventInfo.invitedFriends) {
      return JSON.stringify(eventInfo.invitedFriends).replace(/[\[|\]|\"]/g, "").split(",").join("; ")
    }
    return null;
  }

  return (
    <div className="calender-modal-container">
      <div className="calender-modal-background"  style={{backgroundColor: eventInfo.backgroundColor || "#3788d8"}} />
      <div className="calender-modal-styling" />

      <div className="calender-modal-content">
        <div className="modal-event-title calender-modal-field-value">
          <h1>{eventInfo.title}</h1>
        </div>

        <div className="event-field">
          <h2>Horário: </h2>
          <div className="modal-event-start calender-modal-field-value">{parsedDate() || "--:--"}</div>
        </div>

        <div className="event-field">
          <h2>Duração: </h2>
          <div className="modal-event-duration calender-modal-field-value">{eventInfo.duration || "--:--"}</div>
        </div>

        <div className="event-field">
          <h2>Local: </h2>
          <div className="modal-event-place calender-modal-field-value">{eventInfo.place || "-"}</div>
        </div>

        <div className="event-field">
          <h2>Amigos Convidados: </h2>
          <div className="modal-event-invited-friends calender-modal-field-value">{ parsedFriends() || "Não há convidados"}</div>
        </div>

        <div className="event-field">
          <h2>Descrição:  </h2>
          <div className="modal-event-description calender-modal-field-value">{eventInfo.description || "Sem descrição"}</div>
        </div>
        
      </div>
    </div>
  );
};

export default CalenderModal;