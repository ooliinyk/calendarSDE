import moment, { Moment } from "moment";
import { createContext, useContext } from "react";
const currentDate = moment().locale("cz");
export const CalendarContext = createContext<Partial<CalendarContextType>>({});
export const useCalendarContext = () => useContext(CalendarContext);

export type CalendarContextType = {
  events: object;
  deleteEvent: (id: number | undefined) => void;
  updateEvent: (payLoad: EventModel) => void;
  handleAddEditModal: (value: { isOpen: boolean; isEditing: boolean }) => void;
  addEditValues: EventModel;
  setInitialAddEditValues: (value: EventModel) => void;
  initialAddEditValues: EventModel;
  openAddEditModal: (isEditing: boolean, event?: EventModel) => void;
  eventTypes: EventTypeModel[];
  pageState: PageStateModel;
  handlePageState: (value: PageStateModel) => void;
  handleConfirmModal: (value: object) => void;
  setCalendarRef: (value: any) => void;
  currentDate: Moment;
  handleApptDetails: (value: ApptDetailsModel) => void;
  handleMessageState: (value: Partial<MessageModel>) => void;
};

export interface EventModel {
  id?: number;
  title: string;
  location?: string;
  notes?: string;
  creator?: string;
  created?: string;
  updated?: string;
  start?: string;
  end?: string;
  eventType?: EventTypeModel | undefined;
  attendees?: string[];
  branch?: string;
}

export const initialAddEditValues = {
  id: 0,
  title: "",
  location: "",
  notes: "",
  creator: "",
  created: "",
  updated: "",
  eventType: undefined,
  branch: "",
  attendees: [],
  start: currentDate.clone().add(1, "hour").startOf("hour").format(),
  end: currentDate.clone().add(2, "hour").startOf("hour").format(),
};

export interface MessageModel {
  status?: string | undefined;
  message?: string | undefined;
  visible?: boolean | undefined;
}

export interface EventTypeModel {
  id: number;
  name: string;
  color: string;
}

export interface BranchModel {
  key: string;
  text: string;
  value: string;
}

export interface ConfirmModalModel {
  isVisible?: boolean | undefined;
  header?: string | undefined;
  onConfirm?: any | undefined;
  onCancel?: any | undefined;
  content?: string | undefined;
}

export const branchTypes = [
  {
    key: "Brno",
    text: "Brno",
    value: "BRNO",
  },
  {
    key: "Ostrava",
    text: "Ostrava",
    value: "OSTRAVA",
  },
  {
    key: "Olomouc",
    text: "Olomouc",
    value: "OLOMOUC",
  },
  {
    key: "Celofiremní",
    text: "Celofiremní",
    value: "GENERAL",
  },
];

export interface PageStateModel {
  branch: BranchModel;
  activeView: string;
}

export interface ApptDetailsModel {
  visible: boolean;
  event: EventModel | null;
}

export const tabs = [
  { label: "Seznam Udalosti", href: "/list", key: "list" },
  { label: "Calendar", href: "/calendar", key: "calendar" },
];
