import React from "react";
import './CardEvento.css';

const CardEvento = ({ eventInfo }) => {
    const { eventTitle, eventDate, eventDesc } = eventInfo;

    return (
        <li>
            <h4>{eventTitle}</h4>
            <h6 className="my-blue-1">{eventDate}</h6>
            <p>{eventDesc}</p>
        </li>
    );
};

export default CardEvento;
