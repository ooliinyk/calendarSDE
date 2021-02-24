import axios from "axios";
import { EventModel } from "./App.definitions";

export const createEventMutation = async (payLoad: EventModel) => {
  const { data } = await axios.post("/events/create", payLoad);
  return data;
};

export const deleteEventMutation = async (id: number) => {
  return await axios.delete(`/events/${id}/delete`);
};

export const updateEventMutation = async (payLoad: EventModel) => {
  return await axios.post("/events/update", payLoad);
};

export const fetchEventTypes = async () => {
  const { data } = await axios.get("/eventTypes");
  return data;
};
