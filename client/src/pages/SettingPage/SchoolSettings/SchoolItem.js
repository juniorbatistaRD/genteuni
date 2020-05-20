import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Title from "../../../components/common/Title";
import styles from "./SchoolItem.module.css";
import Button from "../../../components/common/Button";

const SchoolItem = ({ school }) => {
  const { currentUser } = useContext(AuthContext);

  const updateSchool = () => {
    currentUser.set("school", school);
    currentUser.save();
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title text={school.attributes.name} />
        {school.attributes.country && (
          <Title
            text={school.attributes.country.attributes.name}
            typeStyle="secondary"
            fontSize="12px"
          />
        )}
        {school.attributes.website && (
          <Title
            text={school.attributes.website}
            typeStyle="secondary"
            fontSize="12px"
          />
        )}
        <Title
          text={school.attributes.isHighSchool ? "Secundaria" : "Universidad"}
          typeStyle="secondary"
          fontSize="12px"
        />
      </div>
      <Button className={styles.addButton} onClick={updateSchool}>
        Elegir Escuela
      </Button>
    </div>
  );
};

export default SchoolItem;
