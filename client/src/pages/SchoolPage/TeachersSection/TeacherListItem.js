import React from "react";
import Title from "../../../components/common/Title";
import styles from "./TeacherListItem.module.css";
import Text from "../../../components/common/Text";
import { Link } from "react-router-dom";

const TeacherListItem = ({ name, area, id }) => {
  return (
    <div className={styles.container}>
      <Link to={"/app/teachers/" + id} style={{ textDecoration: "none" }}>
        <Title text={name} />
      </Link>
      <Text text={area} />
    </div>
  );
};

export default TeacherListItem;
