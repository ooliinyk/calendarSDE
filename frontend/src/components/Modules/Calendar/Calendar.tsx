import React, { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useCalendarContext } from "../../App.definitions";
import moment from "moment";

const CalendarView: React.FC = () => {
  console.log("%c CALEDNAR IS RENDERED", "background: #6cb825; color: #da2442");

  const {
    setCalendarRef,
    openAddEditModal,
    setInitialAddEditValues,
    addEditValues,
    events,
    currentDate,
    handleApptDetails,
  } = useCalendarContext();

  const calendarRef = useRef<FullCalendar>() as React.MutableRefObject<FullCalendar>;

  let calendarEvents: any = [];
  for (const property in events) {
    events[property].forEach((event) => {
      event = {
        ...event,
        color: event.eventType.color,
      };
      calendarEvents.push(event);
    });
  }

  useEffect(() => {
    console.log("useEffect Calendar");
    setCalendarRef!({
      reference: calendarRef,
      viewStart: moment(calendarRef.current?.getApi().view.activeStart),
      viewEnd: moment(calendarRef.current?.getApi().view.activeEnd),
    });
  }, []);

  const handleDateSelect = ({ startStr, endStr }) => {
    console.log(addEditValues);
    const selectedStart = moment(startStr)
      .hour(currentDate!.hour() + 1)
      .startOf("hour")
      .format();
    const selectedEnd = moment(endStr)
      .hour(currentDate!.hour() + 2)
      .subtract(1, "day")
      .startOf("hour")
      .format();
    setInitialAddEditValues!({
      ...addEditValues!,
      start: selectedStart,
      end: selectedEnd,
    });
    openAddEditModal!(false);
  };

  const handleDateClick = (clickState) => {
    console.log(clickState);
    const { _def, _instance } = clickState.event;
    handleApptDetails!({
      visible: true,
      event: {
        ..._def.extendedProps,
        id: _def.publicId,
        title: _def.title,
        start: _instance.range.start,
        end: _instance.range.end,
      },
    });
  };

  return (
    <FullCalendar
      views={{
        dayGridMonth: {
          dayMaxEvents: 4,
          dayMaxEventRows: 6,
        },
      }}
      firstDay={1}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      locale="cs"
      eventClick={handleDateClick}
      selectable={true}
      select={handleDateSelect}
      ref={calendarRef}
      displayEventEnd={true}
      events={calendarEvents}
      showNonCurrentDates={true}
      eventDisplay={"block"}
      eventTimeFormat={{
        hour: "numeric",
        minute: "2-digit",
      }}
      moreLinkText={"udalosti"}
      expandRows={true}
      contentHeight={"auto"} //set the appropriate height here
      customButtons={{
        next: {
          click: () => {
            console.log("I clicked next month");
            calendarRef.current.getApi().next();
            setCalendarRef!({
              reference: calendarRef,
              viewStart: moment(calendarRef.current.getApi().view.activeStart),
              viewEnd: moment(calendarRef.current.getApi().view.activeEnd),
            });
          },
        },
        prev: {
          click: () => {
            console.log("I clicked prev month");
            calendarRef.current.getApi().prev();
            setCalendarRef!({
              reference: calendarRef,
              viewStart: moment(calendarRef.current.getApi().view.activeStart),
              viewEnd: moment(calendarRef.current.getApi().view.activeEnd),
            });
          },
        },
        today: {
          text: "Aktualni",
          click: () => {
            console.log("I clicked aktualni mesic");
            calendarRef.current.getApi().today();
            setCalendarRef!({
              reference: calendarRef,
              viewStart: moment(calendarRef.current.getApi().view.activeStart),
              viewEnd: moment(calendarRef.current.getApi().view.activeEnd),
            });
          },
        },
      }}
    />
  );
};

export default CalendarView;
