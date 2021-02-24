import styled from "styled-components";

export const StyledTextArea = styled.textarea`
  outline: none;
  width: calc(100% - 10px);
  height: 250px;
  border-color: rgba(34, 36, 38, 0.15);
  border-radius: 3px;
  padding: 5px;
  resize: vertical;
  margin: 5px;
  &:focus {
    border-color: #85b7d9;
  }
`;
