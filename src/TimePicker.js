import FullCalendar from '@fullcalendar/react';
import React, { useEffect, useRef, useState } from 'react';
import timeGridPlugin from '@fullcalendar/timegrid'; // bir eklenti
import moment from 'moment/moment';

const eventsList = [
    {
        title: 'Leyla Aziz',
        guestCount: 3,
        start: new Date(2023, 6, 15, 14, 30, 0),
        end: new Date(2023, 6, 15, 16, 40, 0),
        backgroundColor: 'green'
    },
    {
        title: 'Leyla Aziz',
        guestCount: 3,
        start: new Date(2023, 6, 15, 10, 30, 0),
        end: new Date(2023, 6, 15, 11, 20, 0),
        backgroundColor: 'orange'
    },
    {
        title: 'Leyla Aziz',
        guestCount: 3,
        start: new Date(2023, 6, 15, 10, 30, 0),
        end: new Date(2023, 6, 15, 12, 40, 0),
        backgroundColor: '#333'
    },
    {
        title: 'Ziya Aliyev',
        guestCount: 2,
        start: new Date(2023, 6, 16, 10, 0),
        end: new Date(2023, 6, 16, 12, 0),
        backgroundColor: '#dc303c'
    },
    {
        title: 'Aydan Mamedov',
        guestCount: 5,
        start: new Date(2023, 6, 16, 21, 0, 0, 0),
        end: new Date(2023, 6, 16, 23, 0, 0, 0),
        backgroundColor: 'teal'
    }
]

const TimePicker = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [events, setEvents] = useState(eventsList);
    const cRef = useRef(null)

    const handleDateChange = (event) => {
        const value = event.target.value;
        setSelectedDate(value);
        goTo(value)
    };


    const goTo = (value) => {
        if (cRef.current) {
            cRef.current.getApi().gotoDate(value);
        }
    }
    useEffect(() => {
        if (selectedDate) {
            const filteredEvents = eventsList.filter((event) => {
                const eventDate = event.start.toISOString().split('T')[0];
                return eventDate === selectedDate;
            });
            setEvents(filteredEvents);
        }
        setEvents(eventsList)
    }, [selectedDate]);

    const eventContent = (arg) => {
        const formattedStart = moment(arg.event.start).format('HH:mm')
        const formattedEnd = moment(arg.event.end).format('HH:mm')

        return (
            <div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {formattedStart} - {formattedEnd}
                    <span> {arg.event.extendedProps.guestCount}</span>
                    {arg.event.title}
                </div>
            </div>
        );
    };
    const handleEventClick = (arg) => {
        alert(arg.event.title)
    }
    return (
        <div>
            <div className='input-container'>
                <input defaultValue={new Date().toISOString().split('T')[0]} type="date" onChange={handleDateChange} />
            </div>
            <FullCalendar
                ref={cRef}
                slotLabelFormat={{
                    hour: 'numeric',
                    minute: '2-digit',
                    omitZeroMinute: false,
                    meridiem: 'short'
                }}
                eventClick={handleEventClick}

                headerToolbar={{
                    // Empty string to remove the left section of the header
                    // Empty string to remove the center section of the header
                    end: '', // Empty string to remove the right section of the header
                }}
                allDaySlot={false}
                slotDuration="00:30:00"
                plugins={[timeGridPlugin]}
                initialView="timeGridDay"
                events={events}
                eventContent={eventContent}

            />
        </div>
    );
};

export default TimePicker;
