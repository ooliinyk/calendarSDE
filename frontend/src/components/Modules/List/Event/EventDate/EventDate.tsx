import React from "react";
import { StyledDate } from "./EventDate.styles";
import EventType from "./EventType/EventType";
import moment, { Moment } from "moment";
import { EventTypeModel } from "../../../../App.definitions";

interface EvenDateProps {
  startDate: string | undefined;
  eventType: EventTypeModel | undefined;
}
const EventDate: React.FC<EvenDateProps> = ({ startDate, eventType }) => {
  const currentDate = moment(startDate);
  return (
    <>
      <EventType eventType={eventType} />
      <StyledDate>
        <div style={{ height: "50px", lineHeight: "0.8em" }}>
          {currentDate.date()}
        </div>
        <div style={{ lineHeight: "1em", fontSize: "20px" }}>
          {currentDate.format("dddd")}
        </div>
      </StyledDate>
    </>
  );
};

export default EventDate;
