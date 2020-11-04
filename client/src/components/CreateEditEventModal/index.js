import React, { useEffect, useState } from "react";
import "./styles.css";

const CreateEditEventModal = ({ eventInfo, mode, setMode, handleSubmit }) => {
  const parsedDate = () => {
    if (eventInfo.start) {
      const hours = eventInfo.start.toString().match(/[0-9]{2}:[0-9]{2}/g);
      return hours[0];
    }
    return null;
  };

  const parsedFriends = () => {
    if (eventInfo.invitedFriends) {
      return JSON.stringify(eventInfo.invitedFriends)
        .replace(/[\[|\]|\"]/g, "")
        .split(",")
        .join("; ");
    }
    return null;
  };

  const [title, setTitle] = useState(eventInfo.title || "");

  const [backgroundColor, setBackgroundColor] = useState(
    eventInfo.backgroundColor || ""
  );

  const [start, setStart] = useState(parsedDate() || "--:--");
  const [duration, setDuration] = useState(eventInfo.duration || "--:--");
  const [description, setDescription] = useState(eventInfo.description || "");
  const [invitedFriends, setInvitedFriends] = useState(
    eventInfo.invitedFriends || []
  );
  const [place, setPlace] = useState(eventInfo.place || "");
  const [data, setData] = useState(eventInfo);

  useEffect(() => {
    setData({
      title,
      backgroundColor,
      start,
      duration,
      description,
      invitedFriends,
      place,
    });
  }, [
    title,
    backgroundColor,
    start,
    duration,
    description,
    invitedFriends,
    place,
  ]);

  const handleDateDurationChange = (e, target) => {
    if (e.target.value.length > 5 && e.target.value.match(/[^(0-9)]$/))
      return target;

    let val = e.target.value.replace(/[^(0-9)]/g, "");

    if (target.match(/[0-9]/g)) {
      if (val.length === target.replace(/[^(0-9)]/g, "").length) {
        val = val.slice(0, val.length - 1);
      }
    }

    return (
      (val[0] || "-") +
      (val[1] || "-") +
      ":" +
      (val[2] || "-") +
      (val[3] || "-")
    );
  };

  return (
    <form
      className="calender-modal-container"
      onSubmit={(e) => handleSubmit(e, { data, mode })}
    >
      <div
        className="calender-modal-background"
        style={{ backgroundColor: eventInfo.backgroundColor || "#3788d8" }}
      />
      <div className="calender-modal-styling" />

      <div className="calender-modal-content">
        <input
          className="form-modal-title calender-modal-field-value"
          value={title}
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        ></input>

        <div className="event-field">
          <h2>Horário: </h2>
          <input
            className="form-modal-start calender-modal-field-value"
            value={start}
            type="text"
            pattern="(--:--)|([0-9]{2}:[0-9]{2})"
            onChange={(e) => setStart(handleDateDurationChange(e, start))}
          />
        </div>

        <div className="event-field">
          <h2>Duração: </h2>
          <input
            className="form-modal-start calender-modal-field-value"
            value={duration}
            type="text"
            pattern="(--:--)|([0-9]{2}:[0-9]{2})"
            onChange={(e) => setDuration(handleDateDurationChange(e, duration))}
          />
        </div>

        <div className="event-field">
          <h2>Local: </h2>
          <input
            className="form-modal-place calender-modal-field-value"
            value={place}
            type="text"
            onChange={(e) => setPlace(e.target.value)}
          />
        </div>

        <div className="event-field">
          <h2>Amigos Convidados: </h2>
          <div className="form-modal-invited-friends calender-modal-field-value">
            {parsedFriends() || "Não há convidados"}
          </div>
        </div>

        <div className="event-field">
          <h2>Descrição: </h2>
          <textarea
            className="form-modal-description calender-modal-field-value"
            value={description}
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="event-field">
          <h2>Cor do Evento: </h2>
          <input
            className="form-modal-color calender-modal-field-value"
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
        </div>

        <div className="modal-controls">
          {mode === "EDIT" && (
            <>
              <button
                className="calender-modal-control"
                onClick={() => setMode("VIEW")}
              >
                Cancelar
              </button>

              <button
                className="calender-modal-control"
                type="submit"
                onClick={() => console.log(data)}
              >
                Salvar Edição
              </button>
            </>
          )}

          {mode === "CREATE" && (
            <button className="calender-modal-control" type="submit">
              Criar Evento
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default CreateEditEventModal;
