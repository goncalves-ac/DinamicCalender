import React from "react";
import CardEvento from "../CardEvento";
import "./ListaEvento.css";

const ListaEventos = () => {
  const events = [
    {
      id: 1,
      eventTitle: "New Web Design",
      eventDate: "21 March, 2014",
      eventDesc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, et elementum lorem ornare. Maecenas placerat facilisis mollis. Duis sagittis ligula in sodales vehicula...",
    },
    {
      id: 2,
      eventTitle: "New Web Design",
      eventDate: "4 March, 2014",
      eventDesc:
        "Curabitur purus sem, malesuada eu luctus eget, suscipit sed turpis. Nam pellentesque felis vitae justo accumsan, sed semper nisi sollicitudin...",
    },
    {
      id: 3,
      eventTitle: "Awesome Employers",
      eventDate: "1 April, 2014",
      eventDesc:
        "Fusce ullamcorper ligula sit amet quam accumsan aliquet. Sed nulla odio, tincidunt vitae nunc vitae, mollis pharetra velit. Sed nec tempor nibh...",
    },
  ];

  return (
    <div className="col-md-6 offset-md-3">
      <ul className="timeline">
        {events.map((event) => (
          <CardEvento key={event.id} eventInfo={event} />
        ))}
      </ul>
    </div>
  );
};

export default ListaEventos;
