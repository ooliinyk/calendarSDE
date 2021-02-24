import styled from "styled-components";

export const LegendaContainer = styled.div`
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  border-radius: 5px;
  margin: 0px 5px 10px 5px;
`;

export const EventTypeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
`;

export const EventTypeColorContainer = styled.div`
  height: 10px;
  width: 50px;
  border-radius: 4px;
  background-color: ${(props) => props.color};
`;

export const EventTypeLabel = styled.p`
  font-size: 20px;
  margin: 0px 5px 0px 0px;
  padding: 2px 0px;
`;
