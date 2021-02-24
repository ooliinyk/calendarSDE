import styled from "styled-components";
interface Props {
  isOpen?: boolean;
  selected?: boolean;
}

export const StyledInput = styled.div`
  cursor: pointer;
  line-height: 1em;
  width: 100%;
  min-width: 1em;
  min-height: 2.71428571em;
  background: #fff;
  display: flex;
  justify-content: space-between;
  //align-items: center;
  padding: 0.78571429em;
  color: rgba(0, 0, 0, 0.87);
  border: 0px solid transparent;
  border-radius: 0.28571429rem;

  &:hover {
    border-color: rgba(34, 36, 38, 0.35);
    -webkit-box-shadow: none;
    box-shadow: none;
  }
`;

export const EventColor = styled.div`
  height: auto;
  width: 10px;
  background-color: ${(props) => props.color};
  margin-right: 10px;
  border: 1px solid transparent;
  border-radius: 2px;
`;

export const StyledDropdown = styled.div`
  height: 100%;
  width: 100%;
  cursor: pointer;
  line-height: 1em;
  white-space: normal;
  min-width: 1em;
  min-height: 2.71428571em;
  background: #fff;
  position: relative;
  z-index: 1;
  color: rgba(0, 0, 0, 0.87);
  border: ${(props: Props) =>
    props.isOpen ? "1px solid #96c8da" : "1px solid rgba(34, 36, 38, 0.15)"};
  border-radius: 0.28571429rem;
`;

export const DropdownMenu = styled.div`
  width: 100%;
  line-height: 1em;
  outline: 0;
  min-width: 1em;
  min-height: 2.71428571em;
  background: #fff;
  position: absolute;
  border: 1px solid #96c8da;
  border-radius: 0.28571429rem;
  box-shadow: 0px 5px 8px 2px rgba(0, 0, 0, 0.2);
`;
export const MenuItem = styled.div`
  cursor: pointer;
  color: ${(props: Props) => (props.selected ? "grey" : "black")};
  display: flex;
  padding: 0.78571429rem;

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;
