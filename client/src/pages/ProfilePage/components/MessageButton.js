import React from "react";
import Button from "../../../components/common/Button";
import Swal from "@sweetalert/with-react";
import SendMessageForm from "../../../components/SendMessageForm";

const MessageButton = ({ toUser }) => {
  return (
    <Button
      onClick={() => Swal(<SendMessageForm toUser={toUser} />)}
      typeStyle="secondary"
      padding="5px 15px"
      margin="0px 10px 0px 0px"
    >
      Hablar
    </Button>
  );
};

export default MessageButton;
