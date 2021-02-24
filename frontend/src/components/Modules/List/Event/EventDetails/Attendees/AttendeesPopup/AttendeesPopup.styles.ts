import styled from "styled-components";
import { MyIcon } from "../../../../../../myComponents/Icon/MyIcon.styles";

export const AttendeeList = styled.div`
  max-height: calc(700px - 55%);
  overflow: auto;
  margin-top: 5px;
`;

export const StyledAttendee = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1.5px 0px;
  padding: 8px 10px;

  & > ${MyIcon} {
    visibility: hidden;
  }

  &:hover {
    cursor: pointer;
    font-weight: 700;
    font-size: 16px;
    & > ${MyIcon} {
      visibility: visible;
      font-size: 14px;
    }
  }
`;

export const EmptyAttendeeList = styled.span`
  justify-content: space-around;
  display: flex;
  margin-top: 25px;
  color: grey;
`;
