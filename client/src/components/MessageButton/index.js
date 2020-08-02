import React from "react";
import Button from "../common/Button";
import Swal from "@sweetalert/with-react";
import SendMessageForm from "../SendMessageForm";

const MessageButton = ({ toUser, pretext }) => {
  return (
    <Button
      onClick={() =>
        Swal({
          content: <SendMessageForm toUser={toUser} pretext={pretext} />,
          buttons: false,
        })
      }
      typeStyle="secondary"
      padding="5px 15px"
      margin="0px 10px 0px 0px"
    >
      Hablar
    </Button>
  );
};

MessageButton.defaultProps = {
  pretext: "",
};

export default MessageButton;
