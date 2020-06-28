import React from "react";
import Title from "../../../components/common/Title";
import styles from "./TeacherListItem.module.css";
import Text from "../../../components/common/Text";
import { useNavigate } from "react-router-dom";
import { schoolBook } from "react-syntax-highlighter/dist/esm/styles/hljs";

const TeacherListItem = ({ name, area, id }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.container}
      onClick={() => navigate("/app/teachers/" + id)}
    >
      <Title text={name} />
      <Text text={area} />
    </div>
  );
};

export default TeacherListItem;
