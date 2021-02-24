import React from "react";
import { AttendeePopupContainer } from "../../EventDetails.styles";
import { Icon, Input } from "semantic-ui-react";
import { StyledAttendee, EmptyAttendeeList } from "./AttendeesPopup.styles";
import { MyIcon } from "../../../../../../myComponents/Icon/MyIcon.styles";
import { useFormik } from "formik";
import {
  EventModel,
  useCalendarContext,
} from "../../../../../../App.definitions";
import Dictionary from "../../../../../../../utilities/dictionary";

interface Props {
  event: EventModel;
}

const AttendeesPopup: React.FC<Props> = ({ event }) => {
  const { updateEvent, handleConfirmModal } = useCalendarContext();
  const listOfAttendees = event!.attendees!.map((attendee, index) => {
    return (
      <StyledAttendee key={index}>
        <div>
          <Icon name="user" color="grey" />
          {attendee}
        </div>
        <MyIcon
          hovercolor={"red"}
          name="trash alternate"
          onClick={() =>
            handleConfirmModal!({
              isVisible: true,
              onConfirm: () => removeAttendee(index),
              onCancel: () => handleConfirmModal!({ isVisible: false }),
              header: "Smazat ucastnika",
              content: `Opravdu chcete smazat ${attendee}?`,
            })
          }
        />
      </StyledAttendee>
    );
  });

  const formik = useFormik({
    initialValues: {
      ...event,
    },
    onSubmit: (values) => {
      updateEvent!({
        ...values,
      });
    },
  });

  const addAttendee = (e) => {
    formik.values.attendees = [...event.attendees, e.target.value];
    event.attendees = [...event.attendees, e.target.value];
    if (e.target.value !== "") {
      formik.submitForm();
      e.target.value = "";
    }
  };

  const removeAttendee = (attendee) => {
    const newList = event.attendees!.filter(
      (item, index) => index !== attendee
    );
    event.attendees = newList;
    formik.values.attendees = newList;
    formik.submitForm();
  };
  return (
    <form>
      <Input
        type="text"
        maxLength="30"
        placeholder="Pridat ucastnika"
        fluid
        autoComplete="off"
        size="mini"
        icon="user plus"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addAttendee(e);
          }
        }}
      />

      <>
        {listOfAttendees.length ? (
          listOfAttendees
        ) : (
          <EmptyAttendeeList>
            {Dictionary.attendeeForm.emptyList}
          </EmptyAttendeeList>
        )}
      </>
    </form>
  );
};

export default AttendeesPopup;
