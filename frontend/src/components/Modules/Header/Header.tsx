import React, { useEffect, useState } from "react";
import { Button } from "../../myComponents/Button/Button.styles";
import { useCalendarContext, tabs } from "../../App.definitions";
import { StyledHeader, LeftSide, RightSide, Tab, Body } from "./Header.styles";
import Dictionary from "../../../utilities/dictionary";
import { branchTypes } from "../../App.definitions";
import { Dropdown } from "semantic-ui-react";
import { useLocation } from "react-router-dom";
import EventTypeLegenda from "../../myComponents/EventTypeLegenda/EventTypeLegenda";

const Header: React.FC = ({ children }) => {
  console.log("%c HEADER IS RENDERED", "background: #ce1b6f; color: #da2442");

  const {
    openAddEditModal,
    pageState,
    handlePageState,
    addEditValues,
    setInitialAddEditValues,
    eventTypes,
  } = useCalendarContext();

  const location = useLocation();

  useEffect(() => {
    console.log("useEffect Header");
    handlePageState!({ ...pageState!, activeView: location.pathname });
  }, [location]);

  const listOfBranches = branchTypes.slice(0, -1).map((type, index) => (
    <Dropdown.Item
      key={index}
      text={type.value}
      onClick={() => {
        handlePageState!({ ...pageState!, branch: type });
        setInitialAddEditValues!({ ...addEditValues!, branch: type.value });
      }}
      selected={pageState!.branch === type ? true : false}
    />
  ));

  const listOfTabs = tabs.map((tab, index) => (
    <Tab
      key={index}
      to={tab.href}
      activeClassName="active"
      onClick={() => console.log(tab.key)}
    >
      {tab.label}
    </Tab>
  ));

  return (
    <>
      <StyledHeader>
        <LeftSide>{listOfTabs}</LeftSide>
        <RightSide>
          <Dropdown text={pageState!.branch!.value} className="branch">
            <Dropdown.Menu>{listOfBranches}</Dropdown.Menu>
          </Dropdown>
          <Button onClick={() => openAddEditModal!(false)}>
            {Dictionary.general.newEventButton}
          </Button>
        </RightSide>
      </StyledHeader>
      <Body>
        <EventTypeLegenda eventTypes={eventTypes} />
        {children}
      </Body>
    </>
  );
};

export default Header;
