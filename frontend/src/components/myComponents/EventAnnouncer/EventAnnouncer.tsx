import React from "react";
import moment, { Moment } from "moment";
import { Announcer } from "../Announcer/Announcer.styles";

interface Props {
  eventStart: string | undefined;
  eventEnd: string | undefined;
  eventCreate: string | undefined;
  eventUpdate: string | undefined;
}

//nova, editovana, dnes, zitra

const EventAnnouncer: React.FC<Props> = (props) => {
  const { eventStart, eventEnd, eventCreate, eventUpdate } = props;
  const currentDate = moment();

  const today = currentDate.diff(moment(eventStart), "days") === 0;
  const tomorrow =
    currentDate.diff(moment(eventStart), "days") === -1 ||
    currentDate.diff(moment(eventEnd), "days") === -1;
  const newEvent = currentDate.diff(moment(eventCreate), "days") <= 3;
  const updated = eventCreate !== eventUpdate;

  return (
    <div style={{ display: "flex" }}>
      {today && <Announcer color="red">Dnes</Announcer>}
      {tomorrow && <Announcer color="green">Zitra</Announcer>}
      {newEvent && <Announcer color="pink">Nova</Announcer>}
      {updated && <Announcer color="blue">Opravena</Announcer>}
    </div>
  );
};

export default EventAnnouncer;
