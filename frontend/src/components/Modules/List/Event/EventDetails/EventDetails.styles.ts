import styled, { css, keyframes } from "styled-components";

interface StyledProps {
  hover?: boolean;
}

export const EventDetailsStyled = styled.div`
  flex-grow: 4;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
`;

export const Header = styled.div`
  margin: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const Body = styled.div`
  margin-top: 5px;
  flex-grow: 2;
  display: flex;
`;

export const Footer = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
`;

export const WrapperDetail = styled.div`
  font-size: 15px;
  margin-right: 15px;
  ${(props: StyledProps) =>
    props.hover &&
    css`
      cursor: pointer;
      &:hover {
        transition: transform 0.3s;
        text-decoration: underline;
      }
    `};
`;

export const StyledNotes = styled.div`
  width: 100%;
  padding: 10px;
  max-height: 200px;
  overflow: auto;
`;

export const AttendeePopupContainer = styled.div`
  width: 200px;
  height: 200px;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  position: absolute;
  box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.15);
  overflow: auto;
  padding: 2px;
  z-index: 1;
`;

export const CreatorName = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin: 0px 5px 0px 0px;
`;
