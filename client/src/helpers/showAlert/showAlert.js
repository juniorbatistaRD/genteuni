import React from "react";
import swal from "@sweetalert/with-react";
import "./index.css";

export default async function showAlert(props) {
  await swal({
    icon: props.type,
    title: props.title,
    text: props.text,
    content: <div>{props.content}</div>
  });
}
