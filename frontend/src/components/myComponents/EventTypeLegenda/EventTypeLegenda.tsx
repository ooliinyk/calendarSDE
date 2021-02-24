import React from "react";
import {
  LegendaContainer,
  EventTypeContainer,
  EventTypeColorContainer,
  EventTypeLabel,
} from "./EventTypeLegenda.styles";

const EventTypeLegenda: React.FC<{ eventTypes: any }> = ({ eventTypes }) => {
  console.log(eventTypes);
  const eventTypeList = eventTypes?.map((eventType) => {
    return (
      <EventTypeContainer key={eventType.id}>
        <EventTypeLabel>{eventType.name}</EventTypeLabel>
        <EventTypeColorContainer color={eventType.color} />
      </EventTypeContainer>
    );
  });

  return <LegendaContainer>{eventTypeList}</LegendaContainer>;
};

export default EventTypeLegenda;
