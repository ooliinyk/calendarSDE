import React from "react";
import { EventTypeContainer } from "./EventType.styles";
import { Popup } from "semantic-ui-react";
import { EventTypeModel } from "../../../../../App.definitions";

interface EventTypeProps {
  eventType: EventTypeModel | undefined;
}
const EventType: React.FC<EventTypeProps> = ({ eventType }) => {
  return (
    <Popup
      content={eventType!.name}
      size="mini"
      trigger={<EventTypeContainer color={eventType!.color} />}
    />
  );
};

export default EventType;
