import React, { useState } from "react";
import { EventTypeModel } from "../../App.definitions";
import {
  StyledInput,
  EventColor,
  StyledDropdown,
  DropdownMenu,
  MenuItem,
} from "./CustomDropdown.styles";
import { Icon } from "semantic-ui-react";

interface DropdownProps {
  name: string;
  id: string;
  listOptions: EventTypeModel[] | undefined;
  value: EventTypeModel | undefined;
  onChange: (e: any, value: any) => void;
}

const CustomDropdown: React.FC<DropdownProps> = ({
  listOptions,
  value,
  onChange,
  name,
}) => {
  const [isOpen, handleOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    handleOpen(false);
    onChange(null, { value: value, name: name });
  };

  const eventTypeList = listOptions?.map((type) => (
    <MenuItem
      key={type.id}
      onClick={onOptionClicked(type)}
      selected={type.id === value!.id ? true : false}
    >
      <EventColor color={type.color} />
      {type.name}
    </MenuItem>
  ));
  return (
    <StyledDropdown isOpen={isOpen}>
      <StyledInput onClick={() => handleOpen(!isOpen)}>
        <div style={{ display: "flex" }}>
          <EventColor color={selectedOption!.color} />
          {selectedOption!.name}
        </div>
        <Icon visible={1} name="chevron down" />
      </StyledInput>
      {isOpen ? <DropdownMenu>{eventTypeList}</DropdownMenu> : null}
    </StyledDropdown>
  );
};

export default CustomDropdown;
