import React from "react";
import { StyledTextArea } from "./TextArea.styles";

interface TextAreaProps {
  name?: string;
  rows?: number;
  id?: string;
  onChange(event: any): void;
  value?: string;
}
const TextArea: React.FC<TextAreaProps> = ({
  name,
  rows,
  id,
  onChange,
  value,
}) => {
  return (
    <StyledTextArea
      rows={rows}
      name={name}
      id={id}
      onChange={(event) => onChange(event)}
      value={value}
    />
  );
};

export default TextArea;
