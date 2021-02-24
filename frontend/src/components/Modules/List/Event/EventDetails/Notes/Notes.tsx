import React, { useState } from "react";
import { StyledNotes } from "../EventDetails.styles";
import ReactHtmlParser from "react-html-parser";

interface NotesProps {
  notes: string;
}

const Notes: React.FC<NotesProps> = ({ notes }) => {
  return (
    <>
      <StyledNotes>{ReactHtmlParser(notes)}</StyledNotes>
    </>
  );
};

export default Notes;
