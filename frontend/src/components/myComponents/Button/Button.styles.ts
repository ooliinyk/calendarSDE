import styled from "styled-components";

export const Button = styled.button`
  border: 1px solid transparent;
  font-weight: 500;
  color: white;
  outline: none;
  border-radius: 4px;
  padding: 10px;
  background-color: rgba(7, 43, 49, 1);
  &:hover {
    cursor: pointer;
    -webkit-box-shadow: 0px 0px 7px 2px rgba(7, 43, 49, 0.52);
    -moz-box-shadow: 0px 0px 7px 2px rgba(7, 43, 49, 0.52);
    box-shadow: 0px 0px 7px 2px rgba(7, 43, 49, 0.52);
    color: #3cdbc0;
  }
`;
