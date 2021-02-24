import moment from "moment";
import React from "react";
import { Icon } from "semantic-ui-react";
import { WrapperDetail } from "../EventDetails.styles";

interface TimeProps {
  start: string | undefined;
  end: string | undefined;
}

const Time: React.FC<TimeProps> = ({ start, end }) => {
  //console.log(start);
  const startDate = moment(start);
  const endDate = moment(end);
  //console.log(startDate);
  return (
    <WrapperDetail>
      <Icon name="clock outline" />
      {`${startDate.format("HH:mm")} - ${endDate.format("HH:mm")}`}
    </WrapperDetail>
  );
};

export default Time;
