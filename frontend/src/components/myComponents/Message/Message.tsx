import React, { useState, useEffect } from "react";
import { StyledMessage, TextMessage } from "./Message.styles";
import { Icon } from "semantic-ui-react";
import { MyIcon } from "../Icon/MyIcon.styles";
import { MessageModel } from "../../App.definitions";

interface MessageProps {
  messageState: MessageModel;
}
const Message: React.FC<MessageProps> = ({ messageState }) => {
  const [initialMessageState, handleMessageState] = useState(messageState);

  useEffect(() => {
    handleMessageState(messageState);
    setTimeout(() => {
      handleMessageState({});
    }, 5000);
  }, [messageState]);

  return initialMessageState.visible ? (
    <StyledMessage>
      {messageState.status === "success" ? (
        <Icon color="green" size="large" name="check" />
      ) : (
        <Icon color="red" size="large" name="ban" />
      )}

      <TextMessage>{messageState.message}</TextMessage>
      <MyIcon
        name="close"
        style={{ marginLeft: "auto", fontSize: "20px" }}
        onClick={() => handleMessageState({})}
      />
    </StyledMessage>
  ) : null;
};

export default Message;
