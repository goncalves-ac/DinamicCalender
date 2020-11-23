import React, { useEffect } from "react";
import Nav from "../../components/Nav";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridWeek from "@fullcalendar/timegrid";
import timeGridDay from "@fullcalendar/timegrid";
import listYear from "@fullcalendar/list"; //listMonth, listWeek, listDay, listYear
import ModalOverlay from "../../components/ModalOverlay";
import CalenderModal from "../../components/CalenderModal";
import "./style.css";
import CreateEditEventModal from "../../components/CalenderModal/CreateEditEventModal";
import { useState } from "react";
import useAuthUserFriendlist from "../../hooks/useAuthUserFriendlist";
import parseHoursToMillis from "../../util/parseHoursToMillis";
import parseMillisToHours from "../../util/parseMillisToHours";
import api from "../../api";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

export default function Calendario() {
  const { authState, setAuthState } = useContext(AuthContext);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    `${new Date().getFullYear}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`
  );
  const { authUserFriendList } = useAuthUserFriendlist();
  const [allFriends, setAllFriends] = useState([]);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const updateAuthState = async () => {
    try {
      const { data } = await api.get("/usuario");
      setAuthState(Object.assign({}, authState, { userInfo: data[0] }));
      setLoading(false);
    } catch (e) {
      alert("Houve algum erro. Por favor, atualize a página.");
    }
  };

  useEffect(() => {
    setAllFriends(authUserFriendList);
  }, [authUserFriendList]);

  const calendarRef = React.createRef();

  const handleDeleteEvent = async () => {
    console.log(selectedEvent.idEvento);

    try {
      setLoading(true);
      await api.delete(`/eventos/${selectedEvent.idEvento}`);
      await updateAuthState();
      handleCloseDetails();
      handleCloseCreation();
    } catch (e) {
      setLoading(false);
      if (e.response) {
        alert(`${e.response.data.message}`);
      } else {
        alert("Houve um erro. Por favor, atualize a página.");
      }
    }
  };

  const getEventDTOFromCalendarEvent = ({ event }) => {
    return {
      idEvento: event._def.publicId,
      title: event.title,
      backgroundColor: event.backgroundColor,
      start: event.start,
      dateStart: event.start,
      duration: parseMillisToHours(
        Date.parse(event._instance.range.end) -
          Date.parse(event._instance.range.start)
      ),
      description: event._def.extendedProps.description,
      invitedFriends: event._def.extendedProps.invitedFriends,
      place: event._def.extendedProps.place,
      privacy: event._def.extendedProps.privacy,
      fkIdDono: event._def.extendedProps.fkIdDono,
    };
  };

  const handleEventClick = (event) => {
    const eventInfo = getEventDTOFromCalendarEvent(event);
    setSelectedEvent(eventInfo);
  };

  const handleDateChange = async (event) => {
    const eventInfo = getEventDTOFromCalendarEvent(event);
    await handleModalFormSubmit(null, { eventInfo, mode: "EDIT" });
  };

  const handleDateClick = (event) => {
    setShowCreateEventModal(true);
    setSelectedDate(event.dateStr);
  };

  const handleCloseDetails = () => setSelectedEvent(null);
  const handleCloseCreation = () => setShowCreateEventModal(false);

  const handleModalFormSubmit = async (e, { eventInfo, mode }) => {
    if (e) {
      e.preventDefault();
    }
    let eventStartDate;
    if (mode === "CREATE") {
      eventStartDate = new Date(`${selectedDate}T${eventInfo.start}:00`);
    } else if (mode === "EDIT") {
      eventStartDate = eventInfo.dateStart;
    }
    console.log(eventStartDate);

    const eventEndDate = new Date(
      Date.parse(eventStartDate) + parseHoursToMillis(eventInfo.duration)
    );

    const eventDTO = {
      titulo: eventInfo.title,
      descricao: eventInfo.description,
      inicio: eventStartDate.toISOString(),
      fim: eventEndDate.toISOString(),
      corDeFundo: eventInfo.backgroundColor,
      local: eventInfo.place,
      privacidade: eventInfo.privacy,
      convites: eventInfo.invitedFriends.map((friend) => friend.idUsuario),
    };

    if (mode === "CREATE") {
      try {
        setLoading(true);
        console.log(eventDTO);
        await api.post("/eventos", eventDTO);
        await updateAuthState();
        handleCloseDetails();
        handleCloseCreation();
      } catch (e) {
        setLoading(false);
        alert("Houve um erro ao criar o evento. Tente novamente mais tarde.");
      }
    } else if (mode === "EDIT") {
      console.log(eventInfo);
      try {
        setLoading(true);
        await api.put(`/eventos/${eventInfo.idEvento}`, eventDTO);
        await updateAuthState();
        setLoading(false);
        handleCloseDetails();
        handleCloseCreation();
      } catch (e) {
        setLoading(false);
        alert(
          "Houve um erro ao atualizar o evento. Tente novamente mais tarde."
        );
      }
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(
          `/eventos/convites?idUser=${authState.userInfo.idUsuario}`
        );
        const acceptedInvites = data.filter(
          (invite) => invite.status === "ACCEPTED"
        );
        const acceptedInvitesEventIds = acceptedInvites.map(
          (invite) => invite.fkIdEvento
        );

        const selfEvents = authState.userInfo.eventosProprios;
        const otherEvents = authState.userInfo.eventosAlheios.filter((event) =>
          acceptedInvitesEventIds.includes(event.id_evento)
        );
        const allEventsToDisplay = [...selfEvents, ...otherEvents].map(
          (event) => {
            const eventDuration = parseMillisToHours(
              Date.parse(event.fim) - Date.parse(event.inicio)
            );
            return {
              id: event.id_evento,
              fkIdDono: event.fkIdDono,
              title: event.titulo,
              start: new Date(event.inicio).toISOString(),
              duration: eventDuration,
              end: new Date(event.fim).toISOString(),
              place: event.local,
              invitedFriends: event.usuariosConvidados,
              description: event.descricao,
              allDay: eventDuration === "00:00" ? true : false,
              backgroundColor: event.corDeFundo,
              privacy: event.privacidade,
            };
          }
        );
        setCurrentEvents(allEventsToDisplay);
        setLoading(false);
      } catch (e) {
        alert(
          "Houve um problema ao buscar os eventos. Tente atualizar a página."
        );
      }
    };
    fetchEvents();
  }, [authState]);

  return (
    <section>
      {selectedEvent && (
        <ModalOverlay
          children={
            <CalenderModal
              eventInfo={selectedEvent}
              handleSubmit={handleModalFormSubmit}
              allFriends={allFriends}
              setCalendarState={() => {}}
              loading={loading}
              handleDeleteEvent={handleDeleteEvent}
            />
          }
          handleCloseModal={handleCloseDetails}
        />
      )}

      {showCreateEventModal && (
        <ModalOverlay
          children={
            <CreateEditEventModal
              eventInfo={{}}
              handleSubmit={handleModalFormSubmit}
              mode="CREATE"
              allFriends={allFriends}
              loading={loading}
              handleDeleteEvent={handleDeleteEvent}
            />
          }
          handleCloseModal={handleCloseCreation}
        />
      )}

      <Nav />
      <div className="container bg-light my-5 py-3">
        <FullCalendar
          ref={calendarRef}
          contentHeight="auto"
          plugins={[
            dayGridPlugin,
            timeGridWeek,
            timeGridDay,
            listYear,
            interactionPlugin,
          ]}
          editable={true}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listYear",
          }}
          allDayText="O Dia Todo"
          allDayMaintainDuration={true}
          initialView="dayGridMonth"
          events={currentEvents}
          selectable={true}
          dateClick={handleDateClick}
          select={handleDateClick}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          locale="pt-br"
          buttonText={{
            today: "Hoje",
            month: "Mês",
            week: "Semana",
            day: "Diário",
            list: "Lista",
          }}
          eventDrop={handleDateChange}
          eventClick={handleEventClick}
          //events={this.formatEvents()}
        />
      </div>
    </section>
  );
}
