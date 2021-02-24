import React, { useState } from "react";
import {
  EventContainer,
  Card,
  PicBlock,
  DefaultPicBlock,
} from "./Event.styles";
import EventDate from "./EventDate/EventDate";
import EventDetails from "./EventDetails/EventDetails";
import Notes from "./EventDetails/Notes/Notes";
import { EventModel } from "../../../App.definitions";
import { Image } from "semantic-ui-react";
import logo from "../../../../logo/logo_edited.png";

interface EventProps {
  event: EventModel;
}
//font-family Montserrat, sans-serif
const Event: React.FC<EventProps> = ({ event }) => {
  const [isIconVisible, setIconVisibility] = useState<boolean>(false);
  const [isNoteVisible, toggleNotes] = useState<boolean>(false);

  return (
    <Card
      onMouseOver={() => setIconVisibility(true)}
      onMouseLeave={() => {
        setIconVisibility(false);
        /*toggleNotes(false)*/
      }}
    >
      <EventContainer>
        <EventDate startDate={event.start} eventType={event.eventType} />
        <DefaultPicBlock>
          <Image src={logo} alt="default img" />
        </DefaultPicBlock>
        {/*<PicBlock>
          <Image
            src={logo}
            fluid
            //verticalAlign={"bottom"}
            //style={{ height: "73px", width: "123px" }}
          />
        </PicBlock>*/}

        <EventDetails
          event={event}
          isIconVisible={isIconVisible}
          isNoteVisible={isNoteVisible}
          showNotes={() => toggleNotes(!isNoteVisible)}
        />
      </EventContainer>
      {/*isNoteVisible && event.notes ? <Notes notes={event.notes} /> : null*/}
    </Card>
  );
};

export default Event;
