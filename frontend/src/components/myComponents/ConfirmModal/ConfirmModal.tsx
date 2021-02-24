import React, { useState } from "react";
import { Confirm } from "semantic-ui-react";
import { ConfirmModalModel } from "../../App.definitions";
import { Button } from "../Button/Button.styles";

interface ConfirmModalProps {
  state: ConfirmModalModel;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ state }) => {
  const { isVisible, onCancel, onConfirm, header, content } = state;
  return (
    <Confirm
      confirmButton={<Button>Ano</Button>}
      cancelButton={<Button>Ne</Button>}
      open={isVisible}
      content={content}
      header={header}
      onCancel={() => onCancel()}
      onConfirm={() => {
        onConfirm();
        onCancel();
      }}
    />
  );
};

export default ConfirmModal;
