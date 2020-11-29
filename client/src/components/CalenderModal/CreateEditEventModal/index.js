import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import FriendsCarousel from "../../FriendsCarousel";
import FriendCard from "../../FriendsCarousel/FriendCard";
import "./styles.css";

const CreateEditEventModal = ({
  eventInfo,
  mode,
  setMode,
  handleSubmit,
  allFriends,
  loading,
  handleDeleteEvent,
}) => {
  const parsedDate = () => {
    if (eventInfo.start) {
      const hours = eventInfo.start.toString().match(/[0-9]{2}:[0-9]{2}/g);
      return hours[0];
    }
    return null;
  };

  const [idEvento] = useState(eventInfo.idEvento);

  const [title, setTitle] = useState(eventInfo.title || "");

  const [backgroundColor, setBackgroundColor] = useState(
    eventInfo.backgroundColor || "#3788d8"
  );

  const [start, setStart] = useState(parsedDate() || "--:--");
  const [dateStart] = useState(eventInfo.dateStart);
  const [duration, setDuration] = useState(eventInfo.duration || "--:--");
  const [description, setDescription] = useState(eventInfo.description || "");
  const [invitedFriends, setInvitedFriends] = useState(
    eventInfo.invitedFriends || []
  );

  const [place, setPlace] = useState(eventInfo.place || "");
  const [privacy, setPrivacy] = useState(eventInfo.privacy || "PUBLIC");
  const [data, setData] = useState(eventInfo);
  const [addFriendsVisible, setAddFriendsVisible] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState(false);

  const findNotInvitedFriends = useCallback(() => {
    const invitedFriendsIds = invitedFriends.map((friend) => friend.idUsuario);
    return allFriends.filter(
      (friend) => !invitedFriendsIds.includes(friend.idUsuario)
    );
  }, [invitedFriends, allFriends]);

  const [notInvitedFriends, setNotInvitedFriends] = useState(
    findNotInvitedFriends()
  );

  useEffect(() => {
    setData({
      idEvento,
      title,
      backgroundColor,
      start,
      duration,
      description,
      invitedFriends,
      place,
      privacy,
      dateStart,
    });
  }, [
    idEvento,
    title,
    backgroundColor,
    start,
    duration,
    description,
    invitedFriends,
    place,
    privacy,
    dateStart,
  ]);

  const setNotInvitedFriendsCallback = useCallback(() => {
    setNotInvitedFriends(findNotInvitedFriends());
  }, [setNotInvitedFriends, findNotInvitedFriends]);

  useEffect(() => {
    setNotInvitedFriendsCallback();
  }, [invitedFriends, setNotInvitedFriendsCallback]);

  const handleInviteFriend = (friend) => {
    setInvitedFriends([...invitedFriends, friend]);
  };

  const handleUninviteFriend = (friend) => {
    setInvitedFriends(
      invitedFriends.filter((f) => f.idUsuario !== friend.idUsuario)
    );
  };

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

  const onDeleteEvent = async () => {
    if (loading) return;
    if (!confirmDelete) return;

    await handleDeleteEvent();
  };

  return (
    <div className="create-edit-modal-container">
      <form
        className="calender-modal-container"
        onSubmit={(e) => handleSubmit(e, { eventInfo: data, mode })}
      >
        <div
          className="calender-modal-background"
          style={{ backgroundColor: backgroundColor || "#3788d8" }}
        />
        <div className="calender-modal-styling" />

        <div className="calender-modal-content">
          <input
            className="form-modal-title calender-modal-field-value"
            value={title}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nome do Evento"
            required
          ></input>

          <div className="event-field">
            <h2>Horário: </h2>
            <input
              className="form-modal-start calender-modal-field-value"
              value={start}
              type="text"
              pattern="(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])"
              onChange={(e) => setStart(handleDateDurationChange(e, start))}
              required
            />
          </div>

          <div className="event-field">
            <>
              <h2>Duração: </h2>
              <input
                className="form-modal-start calender-modal-field-value"
                value={duration}
                type="text"
                pattern="(--:--)|([0-9]{2}:[0-9]{2})"
                onChange={(e) =>
                  setDuration(handleDateDurationChange(e, duration))
                }
                required
              />
            </>
            {(mode === "CREATE" || mode === "EDIT") && (
              <div className="event-field">
                <h2>Privacidade: </h2>
                <select
                  className="form-control my-form-control-select"
                  value={privacy}
                  onChange={(e) => setPrivacy(e.target.value)}
                >
                  <option value="PUBLIC">Público</option>
                  <option value="PRIVATE">Privado</option>
                </select>
              </div>
            )}
          </div>

          <div className="event-field">
            <h2>Local: </h2>
            <input
              className="form-modal-place calender-modal-field-value"
              value={place}
              type="text"
              onChange={(e) => setPlace(e.target.value)}
              placeholder="Local do Evento"
              required
            />
          </div>

          <div className="event-field">
            <div className="event-field-header">
              <h2>Amigos Convidados: </h2>
              <button
                type="button"
                onClick={() => setAddFriendsVisible(!addFriendsVisible)}
              >
                {(!addFriendsVisible && <i className="fas fa-plus" />) || (
                  <i className="fas fa-times" />
                )}
              </button>
            </div>
            <div className="carousel-container">
              <FriendsCarousel
                loading={false}
                friends={invitedFriends || []}
                mode={"CREATE"}
                uninviteCallback={handleUninviteFriend}
              />
            </div>
          </div>

          <div className="event-field">
            <h2>Descrição: </h2>
            <textarea
              className="form-modal-description calender-modal-field-value"
              value={description}
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição do Evento"
            />
          </div>

          <div className="event-field">
            <h2>Cor do Evento: </h2>
            <input
              className="form-modal-color calender-modal-field-value"
              type="color"
              value={backgroundColor || "#000000"}
              onChange={(e) => setBackgroundColor(e.target.value)}
            />
          </div>

          <div className="modal-controls justify-content-between">
            {mode === "EDIT" && (
              <>
                <button
                  className="calender-modal-control"
                  onClick={() => setMode("VIEW")}
                  type="button"
                >
                  Cancelar
                </button>
                {(!confirmDelete && (
                  <button
                    className="calender-modal-control"
                    onClick={() => {
                      if (loading) return;
                      setConfirmDelete(true);
                    }}
                    type="button"
                  >
                    {(loading && <i className="fas fa-spinner" />) || (
                      <>Deletar</>
                    )}
                  </button>
                )) || (
                  <button
                    className="calender-modal-control"
                    onClick={onDeleteEvent}
                    type="button"
                  >
                    {(loading && <i className="fas fa-spinner" />) || (
                      <>Clique Novamente para Deletar</>
                    )}
                  </button>
                )}

                <button className="calender-modal-control" type="submit">
                  {(loading && <i className="fas fa-spinner" />) || (
                    <>Salvar Edição</>
                  )}
                </button>
              </>
            )}

            {mode === "CREATE" && (
              <button className="calender-modal-control ml-auto" type="submit">
                {(loading && <i className="fas fa-spinner" />) || (
                  <> Criar Evento</>
                )}
              </button>
            )}
          </div>
        </div>
      </form>
      {addFriendsVisible && (
        <div
          className="not-invited-friends-container"
          style={{ backgroundColor: backgroundColor || "#3788d8" }}
        >
          <span
            className="close-friend-list"
            onClick={() => setAddFriendsVisible(false)}
          >
            <i className="fas fa-times" />
          </span>
          <h3>Amigos</h3>
          {(notInvitedFriends.length > 0 &&
            notInvitedFriends
              .sort((a, b) =>
                `${a.nome} ${a.sobrenome}`.localeCompare(
                  `${b.nome} ${b.sobrenome}`
                )
              )
              .map((friend) => {
                return (
                  <div
                    className="not-invited-friend-card"
                    key={friend.idUsuario}
                  >
                    <span
                      className="add-friend-button"
                      onClick={() => handleInviteFriend(friend)}
                    >
                      <i className="fas fa-user-plus" />
                    </span>
                    <FriendCard friend={friend} />
                  </div>
                );
              })) || <p>Não há amigos para convidar</p>}
        </div>
      )}
    </div>
  );
};

export default CreateEditEventModal;
