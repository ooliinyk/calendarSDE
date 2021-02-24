import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const StyledHeader = styled.nav`
  width: 100%;
  height: 60px;
  position: relative;
  background-color: white;
  border-bottom: 1px solid rgba(34, 36, 38, 0.15);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12);
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;
`;

export const Tab = styled(NavLink)`
  font-size: 17px;
  font-weight: 500;
  height: 100%;
  padding: 20px 10px;
  color: rgba(7, 43, 49, 1);

  &.active {
    font-weight: 600;
    color: rgba(7, 43, 49, 1);
    border-bottom: 3px solid rgb(60, 219, 192);
    &:hover {
      color: rgba(7, 43, 49, 1);
    }
  }

  &:not(.active):hover {
    cursor: pointer;
    color: rgba(7, 43, 49, 1);
    border-bottom: 3px solid rgba(60, 219, 192, 0.3);
  }
`;

export const LeftSide = styled.div`
  display: flex;
`;

export const RightSide = styled.div`
  margin: 10px;
  display: flex;
  align-items: center;
`;

export const Body = styled.div`
  padding: 15px;
  background-color: rgb(240 240 240);
  //height: calc(100% - 60px);
`;
