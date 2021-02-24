import React from "react";
import { Input } from "semantic-ui-react";
import {
  StyledAttendee,
  AttendeeList,
  EmptyAttendeeList,
} from "../../../Modules/List/Event/EventDetails/Attendees/AttendeesPopup/AttendeesPopup.styles";
import Dictionary from "../../../../utilities/dictionary";
import { MyIcon } from "../../../myComponents/Icon/MyIcon.styles";

interface AttendeesFormProps {
  name: string;
  id: string;
  value: string[] | undefined;
  addAttendee: (event: any) => void;
  removeAttendee: (id: number) => void;
}

const AttendeesForm: React.FC<AttendeesFormProps> = ({
  value,
  addAttendee,
  removeAttendee,
}) => {
  const listOfAttendees = value!.map((attendee, index) => {
    return (
      <StyledAttendee key={index}>
        {attendee}
        <MyIcon
          hovercolor={"red"}
          name="trash alternate"
          onClick={() => removeAttendee!(index)}
        />
      </StyledAttendee>
    );
  });
  return (
    <>
      <Input
        maxLength="30"
        type="text"
        autoComplete="off"
        fluid
        icon="user plus"
        onKeyPress={addAttendee}
      />
      <AttendeeList>
        {listOfAttendees.length ? (
          listOfAttendees
        ) : (
          <EmptyAttendeeList>
            {Dictionary.attendeeForm.emptyList}
          </EmptyAttendeeList>
        )}
      </AttendeeList>
    </>
  );
};

export default AttendeesForm;
