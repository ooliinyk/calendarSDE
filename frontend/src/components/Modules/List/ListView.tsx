import React from "react";
import MonthTitle from "./MonthTitle/MonthTitle";
import { sortMonthTitleDate } from "../../../utilities/moment-locale";

interface ListViewProps {
  data: any[];
}

const ListView: React.FC<ListViewProps> = ({ data }) => {
  console.log(
    "%c LIST VIEW is RENDERED",
    "background: #d1f117; color: #da2442"
  );
  const listOfEvents = data
    .sort((a, b) => sortMonthTitleDate(a, b))
    .map((each) => (
      <MonthTitle key={each[0]} date={each[0]} events={each[1]} />
    ));
  return <>{listOfEvents}</>;
};

export default ListView;
