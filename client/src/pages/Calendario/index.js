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
import MouseHoverTooltip from "../../components/MouseHoverTooltip";
import { toast } from "react-toastify";

export default function Calendario() {
  const { authState, setAuthState } = useContext(AuthContext);

  const notifyError = (msg) => toast.error(msg);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`
  );
  const { authUserFriendList } = useAuthUserFriendlist();
  const [allFriends, setAllFriends] = useState([]);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialCreateState, setInitialCreateState] = useState(null);
  const [hoverTooltipVisible, setHoverTooltipVisible] = useState(false);
  const [hoverTooltipInfo, setHoverTooltipInfo] = useState(null);

  const updateAuthState = async () => {
    try {
      const { data } = await api.get("/usuario");
      setAuthState(Object.assign({}, authState, { userInfo: data[0] }));
      setLoading(false);
    } catch (e) {
      notifyError("Houve algum erro. Por favor, atualize a página.");
    }
  };

  useEffect(() => {
    setAllFriends(authUserFriendList);
  }, [authUserFriendList]);

  const calendarRef = React.createRef();

  const handleDeleteEvent = async () => {
    try {
      setLoading(true);
      await api.delete(`/eventos/${selectedEvent.idEvento}`);
      await updateAuthState();
      handleCloseDetails();
      handleCloseCreation();
    } catch (e) {
      setLoading(false);
      if (e.response) {
        notifyError(`${e.response.data.message}`);
      } else {
        notifyError("Houve um erro. Por favor, atualize a página.");
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

  const handleDateSelect = (event) => {
    const eventDTO = {
      start: event.start,
      duration: parseMillisToHours(
        Date.parse(event.end) - Date.parse(event.start)
      ),
    };
    if (!eventDTO.duration.match("24:00")) {
      setInitialCreateState(eventDTO);
      setShowCreateEventModal(true);
      setSelectedDate(event.startStr);
    }
  };

  const handleDateChange = async (dropEvent) => {
    const idDono = dropEvent.event._def.extendedProps.fkIdDono;
    if (idDono !== authState.userInfo.idUsuario) {
      notifyError("Você não pode modificar um evento que não é seu.");
      dropEvent.revert();
      setHoverTooltipInfo(null);
      return;
    }
    const eventInfo = getEventDTOFromCalendarEvent(dropEvent);
    try {
      await handleModalFormSubmit(null, {
        eventInfo,
        mode: "EDIT",
        drag: true,
      });
    } catch (e) {
      setHoverTooltipInfo(null);
      dropEvent.revert();
    }
  };

  const handleDateClick = (event) => {
    setShowCreateEventModal(true);
    setSelectedDate(event.dateStr);
  };

  const handleCloseDetails = () => setSelectedEvent(null);
  const handleCloseCreation = () => {
    setShowCreateEventModal(false);
    setInitialCreateState(null);
  };

  const handleModalFormSubmit = async (
    e,
    { eventInfo, mode, drag = false }
  ) => {
    if (e) {
      e.preventDefault();
    }
    let eventStartDate;
    if (mode === "CREATE" && !selectedDate.match("T")) {
      eventStartDate = new Date(`${selectedDate}T${eventInfo.start}:00`);
    } else if (mode === "CREATE" && selectedDate.match("T")) {
      eventStartDate = new Date(selectedDate);
    } else if (mode === "EDIT" && !drag) {
      const newDate = eventInfo.dateStart;
      const startSplit = eventInfo.start.split(":");
      const hours = parseInt(startSplit[0]);
      const minutes = parseInt(startSplit[1]);
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      eventStartDate = newDate;
    } else if (mode === "EDIT" && drag) {
      eventStartDate = eventInfo.dateStart;
    }

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
        await api.post("/eventos", eventDTO);
        await updateAuthState();
        handleCloseDetails();
        handleCloseCreation();
      } catch (e) {
        setLoading(false);
        notifyError(
          "Houve um erro ao criar o evento. Tente novamente mais tarde."
        );
      }
    } else if (mode === "EDIT") {
      try {
        setLoading(true);
        await api.put(`/eventos/${eventInfo.idEvento}`, eventDTO);
        await updateAuthState();
        setLoading(false);
        handleCloseDetails();
        handleCloseCreation();
      } catch (e) {
        setLoading(false);
        notifyError(
          "Houve um erro ao atualizar o evento. Tente novamente mais tarde."
        );
      }
    }
  };

  const handleEventHover = ({ event }) => {
    const isoDate = new Date(event._instance.range.start).toISOString();
    const parsedStart = isoDate.toString().match(/[0-9]{2}:[0-9]{2}/g)[0];

    setHoverTooltipInfo({
      title: event._def.title,
      start: parsedStart,
      duration: parseMillisToHours(
        Date.parse(event._instance.range.end) -
          Date.parse(event._instance.range.start)
      ),
      backgroundColor: event._def.ui.backgroundColor,
      place: event._def.extendedProps.place,
    });
  };

  const handleEventHoverEnd = () => {
    setHoverTooltipInfo(null);
  };

  useEffect(() => {
    setHoverTooltipInfo(null);
  }, [currentEvents]);
  useEffect(() => {
    hoverTooltipInfo
      ? setHoverTooltipVisible(true)
      : setHoverTooltipVisible(false);
  }, [hoverTooltipInfo]);

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
              allDay: false,
              backgroundColor: event.corDeFundo,
              privacy: event.privacidade,
            };
          }
        );
        setCurrentEvents(allEventsToDisplay);
        setLoading(false);
      } catch (e) {
        notifyError(
          "Houve um problema ao buscar os eventos. Tente atualizar a página."
        );
      }
    };
    fetchEvents();
  }, [authState]);

  const EventHoverTooltip = () => {
    return (
      <div
        style={{
          backgroundColor: hoverTooltipInfo.backgroundColor,
          maxWidth: "180px",
        }}
        className="text-white d-flex flex-column p-2 rounded border"
      >
        <h3 className="h6 border-bottom text-center mb-1 pb-1">
          {hoverTooltipInfo.title}
        </h3>
        <p className="mt-1 mb-0">Horário: {hoverTooltipInfo.start}h</p>
        <p className="m-0">Duração: {hoverTooltipInfo.duration}h</p>
        <p className="m-0">Local: {hoverTooltipInfo.place}</p>
      </div>
    );
  };

  return (
    <section>
      {hoverTooltipInfo && hoverTooltipVisible && (
        <MouseHoverTooltip>
          <EventHoverTooltip />
        </MouseHoverTooltip>
      )}

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
              eventInfo={initialCreateState || {}}
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
          select={handleDateSelect}
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
          eventMouseEnter={handleEventHover}
          eventMouseLeave={handleEventHoverEnd}
          defaultTimedEventDuration="00:00"
        />
      </div>
    </section>
  );
}
