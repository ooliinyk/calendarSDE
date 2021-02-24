import React, { useState } from "react";
import { Dropdown, Input } from "semantic-ui-react";
import CustomTitle from "../../Modules/List/Event/EventDetails/CustomTitle/CustomTitle";
import {
  Overlay,
  AddEditModal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormWrapper,
  LeftBody,
  RightBody,
  GroupFields,
  Field,
} from "./AddEditForm.styles";
import { MyIcon } from "../../myComponents/Icon/MyIcon.styles";
import AttendeesForm from "./Attendees/AttendeesForm";
import { DateInput, TimeInput } from "semantic-ui-calendar-react";
import { useFormik } from "formik";
import { EventModel } from "../../App.definitions";
import { reformatDate, formatDate } from "../../../utilities/moment-locale";
import { Button } from "../../myComponents/Button/Button.styles";
import { Label, Required } from "../../myComponents/Label/Label.styles";
import Dictionary from "../../../utilities/dictionary";
import { useCalendarContext, branchTypes } from "../../App.definitions";
import CustomDropdown from "../../myComponents/CustomDropdown/CustomDropdown";
import ImageUploader from "react-images-upload";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";

const editorConfiguration = {
  toolbar: {
    items: [
      "heading",
      "|",
      "bold",
      "italic",
      "|",
      "bulletedList",
      "numberedList",
      "alignment",
      "|",
      "blockQuote",
      "link",

      "highlight",

      "code",
      "insertTable",
    ],
  },
  link: {
    addTargetToExternalLinks: true,
  },
  table: {
    contentToolbar: [
      "tableColumn",
      "tableRow",
      "mergeTableCells",
      "tableProperties",
      "tableCellProperties",
    ],
  },
  typing: {
    transformations: {
      extra: [
        { from: ":)", to: "🙂" },
        { from: ":+1:", to: "👍" },
        { from: ":tada:", to: "🎉" },
        { from: ":grinning:", to: "😀" },
        { from: ":wink:", to: "😉" },
        { from: ":cool:", to: "😎" },
        { from: ":surprise:", to: "😮" },
        { from: ":confusion:", to: "😕" },
        { from: ":party:", to: "🥳" },
        { from: ":cry:", to: "😢" },
        { from: ":cry:", to: "😢" },
        { from: ":love:", to: "❤️‍" },
        { from: ":smile:", to: "😁" },
        { from: ":roll:", to: "🤣" },
      ],
    },
  },
};

const uploaderImgStyle = {
  position: "relative",
  padding: "20px 0px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  margin: "0px auto 10px auto",
  boxShadow: "none",
  border: "1px solid rgba(34, 36, 38, 0.15)",
  borderRadius: "3px",
};

const buttonStyle = {
  border: "1px solid transparent",
  fontWeight: "500",
  color: "white",
  outline: "none",
  borderRadius: "4px",
  padding: "10px",
  backgroundColor: "rgba(7, 43, 49, 1)",
};

interface Props {
  initialState: EventModel;
  cancel: () => void;
  submit: (test: any) => void;
  isEditing: boolean;
}

const AddEditForm: React.FC<Props> = ({
  cancel,
  submit,
  initialState,
  isEditing,
}) => {
  console.log(
    "%c ADDEDIT MODAL is RENDERED",
    "background: #1d2594; color: #da2442"
  );
  console.log(initialState);
  const { updateEvent, eventTypes, handleMessageState } = useCalendarContext();
  const [requiredInputs, handleRequiredInputs] = useState(false);

  const [pictures, setPictures] = useState<{ pictures: any }>({
    pictures: null,
  });

  const [start, setStart] = useState(() => reformatDate(initialState.start));
  const [end, setEnd] = useState(() => reformatDate(initialState.end));

  const formik = useFormik({
    initialValues: {
      ...initialState,
    },
    onSubmit: (values, { resetForm }) => {
      console.log(pictures);
      console.log(formatDate(start.date, start.time));
      const validateReqValues = values.title && values.creator;
      const validatedDate = formatDate(start.date, start.time).isSameOrBefore(
        formatDate(end.date, end.time)
      );
      if (validateReqValues && validatedDate) {
        isEditing
          ? updateEvent!({
              ...values,
              start: formatDate(start.date, start.time).format(
                "YYYY-MM-DDTHH:mm"
              ),
              end: formatDate(end.date, end.time).format("YYYY-MM-DDTHH:mm"),
            })
          : submit({
              ...values,
              img: pictures,
              start: formatDate(start.date, start.time).format(
                "YYYY-MM-DDTHH:mm"
              ),
              end: formatDate(end.date, end.time).format("YYYY-MM-DDTHH:mm"),
            });
        handleRequiredInputs(false);
        cancel();
        resetForm({});
      } else if (!validatedDate) {
        handleRequiredInputs(false);
        handleMessageState!({
          visible: true,
          status: "failed",
          message: Dictionary.addEditForm.dateValError,
        });
      } else {
        handleRequiredInputs(true);
        handleMessageState!({
          visible: true,
          status: "failed",
          message: Dictionary.addEditForm.reqInputsError,
        });
      }
    },
  });

  const [attendees, handleAttendees] = useState(formik.values.attendees);

  const addAttendeeHandler = (event: any) => {
    if (event.key === "Enter" && event.target.value) {
      handleAttendees([...formik.values.attendees, event.target.value]);
      formik.values.attendees = [...attendees, event.target.value];
      formik.setFieldTouched("attendees");
      event.target.value = "";
    }
  };

  const removeAttendeeHandler = (id: number) => {
    const newList = attendees!.filter((item, index) => index !== id);
    handleAttendees(newList);
    formik.values.attendees = newList;
    formik.setFieldTouched("attendees");
  };

  const handlerChanges = (e, data) => {
    formik.values[data.name] = data.value;
    formik.setFieldTouched(data.name);
  };

  const handleNotes = (event, editor) => {
    const value = editor.getData();
    formik.values.notes = value;
    formik.setFieldTouched("notes");
    console.log("EDITOR DATA", value);
  };

  const onUploadImg = (pictureFiles, pictureDataURLs) => {
    let result;
    const reader = new FileReader();
    //reader.readAsBinaryString(pictureFiles[0]);
    reader.readAsDataURL(pictureFiles[0]);
    //reader.readAsArrayBuffer(pictureFiles[0]);
    //console.log(result);
    reader.onload = (event) => {
      result = event.target?.result;
      console.log(result);
      setPictures(result);
      //const result = new Uint32Array(event.target.result);
      //const binary = String.fromCharCode.apply(null, result);
      //console.log(binary, "binary");
    };
    console.log(reader, "reader");
    console.log(pictureFiles, pictureDataURLs);
  };

  return (
    <Overlay>
      <form>
        <AddEditModal>
          <ModalHeader>
            <CustomTitle
              title={
                isEditing
                  ? Dictionary.addEditForm.editTitle
                  : Dictionary.addEditForm.addTitle
              }
            />
            <MyIcon
              name="close"
              style={{ marginLeft: "auto", fontSize: "20px" }}
              onClick={() => {
                cancel();
                formik.resetForm({});
              }}
            />
          </ModalHeader>
          <ModalBody>
            <FormWrapper>
              <LeftBody>
                <GroupFields>
                  <Field width={5}>
                    <Label>
                      {Dictionary.addEditForm.title}
                      <Required>*</Required>
                    </Label>
                    <Input
                      fluid
                      error={requiredInputs}
                      maxLength="30"
                      id="title"
                      type="text"
                      name="title"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      value={formik.values.title}
                    />
                  </Field>
                  <Field width={1}>
                    <Label>{Dictionary.addEditForm.eventType}</Label>
                    <CustomDropdown
                      name="eventType"
                      id="eventType"
                      value={formik.values.eventType}
                      onChange={handlerChanges}
                      listOptions={eventTypes}
                    />
                  </Field>
                </GroupFields>
                <GroupFields>
                  <Field>
                    <Label>{Dictionary.addEditForm.startTime}</Label>
                    <DateInput
                      name="startDate"
                      value={start.date}
                      dateFormat="DD.MM.YYYY"
                      iconPosition="left"
                      onChange={(event, target) =>
                        setStart({ ...start, date: target.value })
                      }
                      closable
                      animation={"none" as any}
                      autoComplete="off"
                      localization="cz"
                    />
                  </Field>
                  <Field>
                    <TimeInput
                      name="startHours"
                      value={start.time}
                      iconPosition="left"
                      onChange={(event, target) =>
                        setStart({ ...start, time: target.value })
                      }
                      closable
                      animation={"none" as any}
                      autoComplete="off"
                      localization="cz"
                    />
                  </Field>
                  <Field>
                    <Label>{Dictionary.addEditForm.endTime}</Label>
                    <DateInput
                      name="endDate"
                      value={end.date}
                      dateFormat="DD.MM.YYYY"
                      iconPosition="left"
                      onChange={(event, target) =>
                        setEnd({ ...end, date: target.value })
                      }
                      closable
                      animation={"none" as any}
                      autoComplete="off"
                      localization="cz"
                    />
                  </Field>
                  <Field>
                    <TimeInput
                      name="endHours"
                      value={end.time}
                      iconPosition="left"
                      onChange={(event, target) =>
                        setEnd({ ...end, time: target.value })
                      }
                      closable
                      animation={"none" as any}
                      autoComplete="off"
                      localization="cz"
                    />
                  </Field>
                </GroupFields>
                <GroupFields>
                  <Field width={5}>
                    <Label>{Dictionary.addEditForm.location}</Label>
                    <Input
                      type="text"
                      fluid
                      name="location"
                      id="location"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      value={formik.values.location}
                    />
                  </Field>
                  <Field width={1}>
                    <Label>{Dictionary.addEditForm.branch}</Label>
                    <Dropdown
                      selection
                      fluid
                      options={branchTypes}
                      name="branch"
                      id="branch"
                      onChange={handlerChanges}
                      value={formik.values.branch}
                    />
                  </Field>
                </GroupFields>
                <Field>
                  <Label>{Dictionary.addEditForm.img}</Label>
                  <ImageUploader
                    withPreview
                    withIcon
                    singleImage
                    buttonText={Dictionary.addEditForm.uploadImgButton}
                    onChange={onUploadImg}
                    imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                    maxFileSize={5242880}
                    fileContainerStyle={uploaderImgStyle}
                    buttonStyles={buttonStyle}
                    label={Dictionary.addEditForm.uploadImgLabel}
                  />
                </Field>
                <Field style={{ paddingBottom: "20px" }}>
                  <Label>{Dictionary.addEditForm.notes}</Label>
                  <CKEditor
                    config={editorConfiguration}
                    editor={Editor}
                    data={formik.values.notes}
                    onChange={handleNotes}
                  />
                </Field>
              </LeftBody>
              <RightBody>
                <Label>{Dictionary.addEditForm.attendees}</Label>
                <AttendeesForm
                  name="attendess"
                  id="attendees"
                  addAttendee={addAttendeeHandler}
                  value={formik.values.attendees}
                  removeAttendee={removeAttendeeHandler}
                />
              </RightBody>
            </FormWrapper>
          </ModalBody>
          <ModalFooter>
            <div>
              <Label>{Dictionary.addEditForm.creator}</Label>
              <Required>*</Required>
              <Input
                id="creator"
                type="text"
                name="creator"
                error={requiredInputs}
                autoComplete="off"
                onChange={formik.handleChange}
                value={formik.values.creator}
              />
            </div>
            <Button type="button" onClick={formik.submitForm}>
              {isEditing
                ? Dictionary.addEditForm.editButton
                : Dictionary.addEditForm.saveButton}
            </Button>
          </ModalFooter>
        </AddEditModal>
      </form>
    </Overlay>
  );
};

export default AddEditForm;
