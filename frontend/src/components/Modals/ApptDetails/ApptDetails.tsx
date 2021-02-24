import React from "react";
import { Icon } from "semantic-ui-react";
import ReactHtmlParser from "react-html-parser";
import { EventModel, useCalendarContext } from "../../App.definitions";
import { Overlay } from "../AddEditForm/AddEditForm.styles";
import {
  ApptDetailsModal,
  ModalHeader,
  Header,
  FlexRow,
  FlexRight,
  ModalBody,
  ModalFooter,
  EventDateBlock,
  EventDate,
  DateTitle,
  DateBody,
  Divider,
  BackgroundImg,
  Notes,
  EventTypeColor,
  EventTypeLabel,
  Attendees,
} from "./ApptDetails.styles";
import CustomTitle from "../../Modules/List/Event/EventDetails/CustomTitle/CustomTitle";
import Location from "../../Modules/List/Event/EventDetails/Location/Location";
import { MyIcon } from "../../myComponents/Icon/MyIcon.styles";
import Dictionary from "../../../utilities/dictionary";
import moment from "moment";
import Creator from "../../Modules/List/Event/EventDetails/Creator/Creator";
import EventAnnouncer from "../../myComponents/EventAnnouncer/EventAnnouncer";
import AttendeesPopup from "../../Modules/List/Event/EventDetails/Attendees/AttendeesPopup/AttendeesPopup";

interface ApptDetailsProps {
  event: EventModel | null;
  //onCancel: any | null;
}

const ApptDetails: React.FC<ApptDetailsProps> = ({ event }) => {
  const {
    start,
    end,
    title,
    location,
    eventType,
    notes,
    attendees,
    creator,
    created,
    updated,
    id,
  } = event!;
  console.log(event);
  const {
    deleteEvent,
    openAddEditModal,
    handleConfirmModal,
    handleApptDetails,
  } = useCalendarContext();
  const startDate = moment(start).utc();
  const endDate = moment(end).utc();

  console.log(startDate, "HERE");

  return (
    <Overlay>
      <ApptDetailsModal width={notes ? "1000px" : "500px"}>
        <ModalHeader>
          <Header>
            <FlexRow justifyContent={"space-between"}>
              <CustomTitle title={title} />
              <FlexRight>
                <MyIcon
                  name="edit"
                  style={{ fontSize: "18px" }}
                  onClick={() => {
                    openAddEditModal!(true, event!);
                    handleApptDetails!({ visible: false, event: null });
                  }}
                />
                <MyIcon
                  name="trash alternate"
                  style={{ fontSize: "18px" }}
                  onClick={() => {
                    handleConfirmModal!({
                      isVisible: true,
                      onConfirm: () => {
                        deleteEvent!(id);
                        handleApptDetails!({ visible: false, event: null });
                      },
                      onCancel: () => handleConfirmModal!({ isVisible: false }),
                      header: "Smazat udalost",
                      content: `Opravdu chcete smazat ${title}?`,
                    });
                  }}
                />
                <MyIcon
                  name="close"
                  style={{ fontSize: "18px" }}
                  onClick={() =>
                    handleApptDetails!({ visible: false, event: null })
                  }
                />
              </FlexRight>
            </FlexRow>
            <FlexRow justifyContent={"flex-start"}>
              <EventTypeColor color={eventType?.color} />
              <EventTypeLabel>{eventType?.name}</EventTypeLabel>
              <EventAnnouncer
                eventStart={start}
                eventEnd={end}
                eventCreate={created}
                eventUpdate={updated}
              />
            </FlexRow>
            {location && (
              <FlexRow justifyContent={"flex-start"}>
                <Location location={location} />
              </FlexRow>
            )}
            <FlexRow justifyContent={"flex-start"}>
              <Creator creator={creator} creatingDate={created} />
            </FlexRow>
            <BackgroundImg></BackgroundImg>
          </Header>
        </ModalHeader>
        <ModalBody>
          {notes && <Notes>{ReactHtmlParser(notes)}</Notes>}
          {event && (
            <Attendees>
              <AttendeesPopup event={event} />
            </Attendees>
          )}
        </ModalBody>
        <ModalFooter>
          <EventDateBlock>
            <EventDate>
              <DateTitle>{Dictionary.addEditForm.startTime}</DateTitle>
              <DateBody>
                <Icon name="calendar alternate" />
                {startDate.format("dddd, DD.MM.YYYY")}
              </DateBody>
              <DateBody>
                <Icon name="clock outline" />
                {startDate.format("HH:mm")}
              </DateBody>
            </EventDate>
            <Divider />
            <EventDate>
              <DateTitle>{Dictionary.addEditForm.endTime}</DateTitle>
              <DateBody>
                <Icon name="calendar alternate" />
                {endDate.format("dddd, DD.MM.YYYY")}
              </DateBody>
              <DateBody>
                <Icon name="clock outline" />
                {endDate.format("HH:mm")}
              </DateBody>
            </EventDate>
          </EventDateBlock>
        </ModalFooter>
      </ApptDetailsModal>
    </Overlay>
  );
};

export default ApptDetails;
