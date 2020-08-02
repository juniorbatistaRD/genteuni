import React from "react";
import Button from "../../../components/common/Button";
import { ReactComponent as TrashIcon } from "../../../assets/icons/trash.svg";
import swal from "@sweetalert/with-react";
import { useNavigate } from "react-router-dom";

const DeleteJobButton = ({ job }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    swal({
      title: "¿Estas Seguro?",
      text: "Una vez borrado no lo podras recuperar",
      dangerMode: true,
      icon: "warning",
      buttons: ["Nope", "Sip"],
    }).then((willDelete) => {
      if (willDelete) {
        job.destroy();
        navigate("/app/job");
        swal("Borrado", {
          icon: "success",
        });
      }
    });
  };

  return (
    <Button typeStyle="secondary" onClick={handleClick}>
      <TrashIcon width="20px" height="20px" fill="#e64646" /> Borrar Trabajo
    </Button>
  );
};

export default DeleteJobButton;
