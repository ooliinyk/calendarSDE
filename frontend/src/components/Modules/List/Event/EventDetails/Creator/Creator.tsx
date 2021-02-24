import moment from "moment";
import React from "react";
import { Icon } from "semantic-ui-react";
import { FlexWrapper } from "../../../../../myComponents/Wrapper/Wrapper.styles";
import { CreatorName } from "../EventDetails.styles";

interface CreatorProps {
  creator: string | undefined;
  creatingDate: string | undefined;
}

const Creator: React.FC<CreatorProps> = ({ creator, creatingDate }) => {
  const formattedDate = moment(creatingDate).format("DD.MM.YYYY HH:mm");

  return (
    <FlexWrapper style={{ color: "grey" }}>
      <Icon name="user" />
      <CreatorName>{creator}</CreatorName>
      <Icon name="clock outline" />
      <div>{formattedDate}</div>
    </FlexWrapper>
  );
};

export default Creator;
