import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import { EventModel } from "../../../../../App.definitions";
import { AttendeePopupContainer, WrapperDetail } from "../EventDetails.styles";
import AttendeesPopup from "./AttendeesPopup/AttendeesPopup";

interface AttendeesProps {
  visible?: boolean;
  //attendees: string[] | undefined;
  event: EventModel;
}

const Attendees: React.FC<AttendeesProps> = ({ visible, event }) => {
  const [isAttendeePopup, showAttendeePopup] = useState<boolean>(false);

  useEffect(() => {
    showAttendeePopup(false);
  }, [visible]);

  const generateAttendeeTitle = (numberOfAttendees: number): string => {
    if (numberOfAttendees <= 4 && numberOfAttendees > 0) {
      return `${numberOfAttendees} účastníky`;
    } else {
      return `${numberOfAttendees} účastníků`;
    }
  };

  return (
    <>
      <Icon name="users" />
      <WrapperDetail
        hover
        onClick={() => showAttendeePopup(true)}
        onMouseLeave={() => showAttendeePopup(false)}
      >
        {generateAttendeeTitle(event.attendees!.length)}
        {isAttendeePopup && visible ? (
          <AttendeePopupContainer>
            <AttendeesPopup event={event} />
          </AttendeePopupContainer>
        ) : null}
      </WrapperDetail>
    </>
  );
};

export default Attendees;
