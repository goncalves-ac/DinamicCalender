import React from 'react';
import Nav from '../../components/Nav';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridWeek from '@fullcalendar/timegrid';
import timeGridDay from '@fullcalendar/timegrid';
import listYear from '@fullcalendar/list'; //listMonth, listWeek, listDay, listYear


export default class Calendario extends React.Component {

    state = {
        weekendsVisible: true,
        currentEvents: [],
        INITIAL_EVENTS: [
            {
                id: 1,
                title: 'Desenvolver Banco de Dados',
                start: new Date().toISOString().replace(/T.*$/, ''),
                allDay: true,
                borderColor: "#b40505",
                backgroundColor: "#ffffaa",
                textColor: "#000000"
            },
            {
                id: 2,
                title: 'Banho e Tosa do Afrânio',
                start: new Date().toISOString().replace(/T.*$/, '') + 'T12:00:00'
            },
            {
                id: 4,
                title: 'Show da Pitty - João Rock',
                start: new Date().toISOString().replace(/T.*$/, '')
            },
            {
                id: 5,
                title: 'Almoçar',
                start: new Date().toISOString().replace(/T.*$/, '') + 'T12:00:00'
            }
        ]
    }

    dataAlterada = (input) => {
        console.log("data alterada");
        console.log(input);
    };

    render() {
        return <section>
            <Nav/>
            <div className="container bg-light my-5 py-3">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridWeek,timeGridDay, listYear, interactionPlugin]}
                    editable={true}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listYear'
                    }}
                    allDayText='O Dia Todo'
                    initialView = 'dayGridMonth'
                    initialEvents={this.state.INITIAL_EVENTS}
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekends={this.state.weekendsVisible}
                    locale='pt-br'
                    buttonText={{
                        today:    'Hoje',
                        month:    'Mês',
                        week:     'Semana',
                        day:      'Diário',
                        list:     'Lista'
                    }}
                    eventDrop={this.dataAlterada}
                    //eventClick={this.handleEventClick}
                    //events={this.formatEvents()}
                />
            </div>
        </section>

    }



}