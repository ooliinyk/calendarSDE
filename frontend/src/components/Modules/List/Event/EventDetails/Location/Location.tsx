import React from "react";
import { Icon } from "semantic-ui-react";
import { WrapperDetail } from "../EventDetails.styles";

interface LocationProps {
  location: string | undefined;
}

const Location: React.FC<LocationProps> = ({ location }) => {
  return (
    <WrapperDetail>
      <Icon name="map marker alternate" />
      {location}
    </WrapperDetail>
  );
};

export default Location;
