import React, { useState, useEffect } from "react";
import {
  EventDetailsStyled,
  Header,
  Body,
  Footer,
} from "./EventDetails.styles";
import CustomTitle from "./CustomTitle/CustomTitle";
import Time from "./Time/Time";
import Location from "./Location/Location";
import Attendees from "./Attendees/Attendees";
import {
  MyFlowedIcon,
  MyRotatedIcon,
  MyHiddenFlowedIcon,
} from "../../../../myComponents/Icon/MyIcon.styles";
import {
  FlexWrapper,
  Wrapper,
} from "../../../../myComponents/Wrapper/Wrapper.styles";
import { EventModel } from "../../../../App.definitions";
import { useCalendarContext } from "../../../../App.definitions";
import { Icon } from "semantic-ui-react";
import Creator from "./Creator/Creator";
import Notes from "./Notes/Notes";
import EventAnnouncer from "../../../../myComponents/EventAnnouncer/EventAnnouncer";

interface EventDetailsProps {
  event: EventModel;
  isIconVisible: boolean;
  isNoteVisible: boolean;
  showNotes(): void;
}

const EventDetails: React.FC<EventDetailsProps> = ({
  isIconVisible,
  isNoteVisible,
  showNotes,
  event,
}) => {
  const {
    start,
    end,
    title,
    location,
    attendees,
    creator,
    notes,
    created,
    updated,
    id,
  } = event;
  const {
    deleteEvent,
    openAddEditModal,
    handleConfirmModal,
  } = useCalendarContext();
  const [settingsIcons, handleSettingsIcons] = useState({
    exist: false,
    shown: false,
  });
  const [isCreatorVisible, handleCreatorVisibility] = useState(false);
  const [test, setTest] = useState(false);

  useEffect(() => {
    handleSettingsIcons({ ...settingsIcons, shown: false });
    handleCreatorVisibility(false);
  }, [isIconVisible]);
  return (
    <EventDetailsStyled>
      <Header>
        <CustomTitle title={title} />
        <EventAnnouncer
          eventStart={start}
          eventEnd={end}
          eventCreate={created}
          eventUpdate={updated}
        />
        <Wrapper>
          <>
            <MyHiddenFlowedIcon
              visible={settingsIcons.exist ? 1 : 0}
              className={settingsIcons.shown && "visible"}
              hoverdirection="down"
              name="info circle"
              onClick={() => handleCreatorVisibility(!isCreatorVisible)}
            />
            <MyHiddenFlowedIcon
              visible={settingsIcons.exist ? 1 : 0}
              className={settingsIcons.shown && "visible"}
              hoverdirection="down"
              name="edit"
              onClick={() => {
                console.log(event, "CLICK HERE");
                openAddEditModal!(true, event);
              }}
            />
            <MyHiddenFlowedIcon
              visible={settingsIcons.exist ? 1 : 0}
              className={settingsIcons.shown && "visible"}
              hoverdirection="down"
              name="trash alternate"
              onClick={() =>
                handleConfirmModal!({
                  isVisible: true,
                  onConfirm: () => deleteEvent!(id),
                  onCancel: () => handleConfirmModal!({ isVisible: false }),
                  header: "Smazat udalost",
                  content: `Opravdu chcete smazat ${title}?`,
                })
              }
            />
          </>
          <MyFlowedIcon
            hoverdirection="down"
            name="ellipsis vertical"
            className={settingsIcons.shown && "expanded"}
            onMouseOver={() =>
              handleSettingsIcons({
                ...settingsIcons,
                exist: true,
              })
            }
            onMouseLeave={() => {
              if (!settingsIcons.shown)
                handleSettingsIcons({
                  ...settingsIcons,
                  exist: false,
                });
            }}
            onClick={() => {
              handleSettingsIcons({
                ...settingsIcons,
                shown: !settingsIcons.shown,
              });
            }}
          />
        </Wrapper>
      </Header>
      <Body>
        <Time start={start} end={end} />
        {location ? <Location location={location} /> : null}
        <Attendees visible={isIconVisible} event={event} />
        {notes && <Icon name="sticky note" />}
      </Body>
      <Footer>
        {notes && (
          <MyRotatedIcon
            className={test ? "clicked" : ""}
            visible={1}
            hoverdirection="up"
            name="chevron down"
            onClick={() => {
              setTest(!test);
              showNotes();
            }}
          />
        )}
        <Wrapper>
          {isCreatorVisible && (
            <Creator creator={creator} creatingDate={created} />
          )}
        </Wrapper>
      </Footer>
      {isNoteVisible && notes ? <Notes notes={notes} /> : null}
    </EventDetailsStyled>
  );
};

export default EventDetails;
