import React, { useState } from "react";
import { StyledMonthTitle, Divider } from "./MonthTitle.styles";
import {
  MyRotatedIcon,
  MyIcon,
  TestIcon,
} from "../../../myComponents/Icon/MyIcon.styles";
import { Header } from "../Event/EventDetails/EventDetails.styles";
import { Badge } from "../../../myComponents/Badge/Badge.styles";
import { Wrapper } from "../../../myComponents/Wrapper/Wrapper.styles";
import Event from "../Event/Event";
import moment from "moment";
import { EventModel } from "../../../App.definitions";
import { sortEventDate } from "../../../../utilities/moment-locale";

interface MonthTitleProps {
  date: string;
  events: EventModel[];
}

const MonthTitle: React.FC<MonthTitleProps> = ({ date, events }) => {
  const monthName = moment(date, "YYYY-M");
  const [isEventShown, showEvent] = useState<boolean>(true);

  const renderEvents = events
    .sort((a, b) => sortEventDate(a.start, b.end))
    .map((event) => <Event key={event.id} event={event} />);
  return (
    <>
      <Header>
        <StyledMonthTitle>{monthName.format("MMMM YYYY")}</StyledMonthTitle>
        <Badge>{events.length}</Badge>
        <Wrapper>
          <TestIcon
            className={isEventShown ? "clicked" : ""}
            name="chevron down"
            onClick={() => showEvent(!isEventShown)}
          />
        </Wrapper>
      </Header>
      <Divider />
      {isEventShown ? renderEvents : null}
    </>
  );
};

export default MonthTitle;
