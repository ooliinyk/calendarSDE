import { Moment } from "moment";
import axios from "axios";

export const getAddEditFormDefaultValues = (date: object): string => {
  return "hello";
};

export const getEvents = async (start: Moment, end: Moment, branch: string) => {
  const startDate = start.format("YYYY-MM-DDTHH:mm");
  const endDate = end.format("YYYY-MM-DDTMM:mm");
  const { data } = await axios.get(
    `/events/map?branch=${branch}&end=${endDate}&start=${startDate}`
  );
  return data;
};

export const getCalendarEvents = async (
  start: Moment,
  end: Moment,
  branch: string
) => {
  const startDate = start.format("YYYY-MM-DDTHH:mm");
  const endDate = end.format("YYYY-MM-DDTMM:mm");
  const { data } = await axios.get(
    `/events?branch=${branch}&end=${endDate}&start=${startDate}`
  );
  return data;
};
