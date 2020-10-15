//https://codepen.io/ankithingarajiya/pen/jQBWEz

jQuery(document).ready(function(){
            jQuery('.datetimepicker').datepicker({
                timepicker: true,
                language: 'pt-BR',
                range: true,
                multipleDates: true,
                multipleDatesSeparator: " - "
            });
            jQuery("#add-event").submit(function(){
                alert("Salvo!!!");
                var values = {};
                $.each($('#add-event').serializeArray(), function(i, field) {
                    values[field.name] = field.value;
                });
                console.log(
                    values
                );
            });
        });

        (function () {
            'use strict';
            jQuery(function() {
                // page is ready
                jQuery('#calendar').fullCalendar({

                    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
                    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
                    buttonText: {
                        today: "Hoje",
                        month: "Mês",
                        week: "Semana",
                        day: "Dia"
                    },

                    themeSystem: 'bootstrap4',
                    businessHours: false,
                    defaultView: 'month',
                    editable: true,
                    // header
                    header: {
                        left: 'title',
                        center: 'month,agendaWeek,agendaDay',
                        right: 'today prev,next'
                    },
                    events: [
                        {
                            title: 'Restaurant',
                            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu pellentesque nibh. In nisl nulla, convallis ac nulla eget, pellentesque pellentesque magna.',
                            start: '2020-10-15T09:30:00',
                            end: '2020-10-15T11:45:00',
                            className: 'fc-bg-default',
                            icon : "glass",
                            allDay: false
                        },
                        {
                            title: 'Dinner',
                            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu pellentesque nibh. In nisl nulla, convallis ac nulla eget, pellentesque pellentesque magna.',
                            start: '2020-11-15T20:00:00',
                            end: '2020-11-15T22:30:00',
                            className: 'fc-bg-default',
                            icon : "cutlery",
                            allDay: false
                        },
                        {
                            title: 'Shooting',
                            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu pellentesque nibh. In nisl nulla, convallis ac nulla eget, pellentesque pellentesque magna.',
                            start: '2020-08-25',
                            end: '2020-08-25',
                            className: 'fc-bg-blue',
                            icon : "camera"
                        },
                        {
                            title: 'Go Space :)',
                            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu pellentesque nibh. In nisl nulla, convallis ac nulla eget, pellentesque pellentesque magna.',
                            start: '2020-12-27',
                            end: '2020-12-27',
                            className: 'fc-bg-default',
                            icon : "rocket"
                        },
                        {
                            title: 'Dentist',
                            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu pellentesque nibh. In nisl nulla, convallis ac nulla eget, pellentesque pellentesque magna.',
                            start: '2020-12-29T11:30:00',
                            end: '2020-12-29T012:30:00',
                            className: 'fc-bg-blue',
                            icon : "medkit",
                            allDay: false
                        }
                    ],
                    eventRender: function(event, element) {
                        //if(event.icon){
                        //    element.find(".fc-title").prepend("<i class='fas fa-"+event.icon+"'></i>");
                        //}
                    },
                    dayClick: function() {
                        jQuery('#modal-view-event-add').modal();
                    },
                    eventClick: function(event, jsEvent, view) {
                        //jQuery('.event-icon').html("<i class='fas fa-"+event.icon+"'></i>");
                        jQuery('.event-title').html(event.title);
                        jQuery('.event-body').html(event.description);
                        jQuery('.eventUrl').attr('href',event.url);
                        jQuery('#modal-view-event').modal();
                    },
                })
            });

        })(jQuery);
