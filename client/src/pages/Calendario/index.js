import React from "react";
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
import CreateEditEventModal from "../../components/CreateEditEventModal";
import friendList from "./../../mock/friendList";

export default class Calendario extends React.Component {
  state = {
    selectedEvent: null,
    showCreateEventModal: false,
    weekendsVisible: true,
    currentEvents: [],
    allFriends: friendList,
    INITIAL_EVENTS: [
      {
        id: 1,
        title: "Banho e Tosa do Afrânio",
        start: new Date().toISOString().replace(/T.*$/, "") + "T12:00:00",
        backgroundColor: "#dd11aa",
      },
      {
        id: 2,
        title: "Desenvolver Banco de Dados",
        start: new Date().toISOString().replace(/T.*$/, ""),
        duration: "02:00",
        place: "Pizzaria Margarithe",
        invitedFriends: [friendList[1], friendList[2], friendList[3]],
        description: "",
        allDay: false,
        backgroundColor: "#dd3333",
      },
      {
        id: 4,
        title: "Show da Pitty - João Rock",
        start: new Date().toISOString().replace(/T.*$/, ""),
        backgroundColor: "#11aa33",
      },
      {
        id: 5,
        title: "Almoçar",
        start: new Date().toISOString().replace(/T.*$/, "") + "T12:00:00",
        backgroundColor: "#9922aa",
      },
    ],
  };

  dataAlterada = (input) => {
    console.log("data alterada");
    console.log(input);
  };

  handleEventClick = ({ event }) => {
    const eventInfo = {
      title: event.title,
      backgroundColor: event.backgroundColor,
      start: event.start,
      duration: event._def.extendedProps.duration,
      description: event._def.extendedProps.description,
      invitedFriends: event._def.extendedProps.invitedFriends,
      place: event._def.extendedProps.place,
    };
    this.setState({ selectedEvent: eventInfo });
  };

  handleDateClick = (event) => {
    this.setState({ showCreateEventModal: true });
    console.log(event);
  };

  handleCloseDetails = () => this.setState({ selectedEvent: null });
  handleCloseCreation = () => this.setState({ showCreateEventModal: false });

  handleModalFormSubmit = (e, { eventInfo, mode }) => {
    e.preventDefault();
  };

  render() {
    return (
      <section>
        {this.state.selectedEvent && (
          <ModalOverlay
            children={
              <CalenderModal
                eventInfo={this.state.selectedEvent}
                handleSubmit={this.handleModalFormSubmit}
              />
            }
            handleCloseModal={this.handleCloseDetails}
          />
        )}

        {this.state.showCreateEventModal && (
          <ModalOverlay
            children={
              <CreateEditEventModal
                eventInfo={{}}
                handleSubmit={this.handleModalFormSubmit}
                mode="CREATE"
              />
            }
            handleCloseModal={this.handleCloseCreation}
          />
        )}

        <Nav />
        <div className="container bg-light my-5 py-3">
          <FullCalendar
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
            initialView="dayGridMonth"
            initialEvents={this.state.INITIAL_EVENTS}
            editable={true}
            selectable={true}
            dateClick={this.handleDateClick}
            select={this.handleDateClick}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            locale="pt-br"
            buttonText={{
              today: "Hoje",
              month: "Mês",
              week: "Semana",
              day: "Diário",
              list: "Lista",
            }}
            eventDrop={this.dataAlterada}
            eventClick={this.handleEventClick}
            //events={this.formatEvents()}
          />
        </div>
      </section>
    );
  }
}
