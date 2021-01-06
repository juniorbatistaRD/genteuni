import React from "react";
import styles from "./index.module.css";
import FlexColumn from "../common/FlexColumn";
import FlexRow from "../common/FlexRow";
import Text from "../common/Text";
import Avatar from "../common/Avatar";
import Moment from "react-moment";
import { ReactComponent as CorrectIcon } from "../../assets/icons/correct.svg";
import { useNavigate, Link } from "react-router-dom";

function CrushHeader({ crush }) {
  const navigate = useNavigate();

  return (
    <FlexColumn className={styles.header}>
      {crush.attributes.isSecret ? (
        <FlexRow className={styles.title}>
          <Link
            to={"/app/profile/" + crush.attributes.toUser.id}
            style={{ textDecoration: "none" }}
          >
            <FlexRow>
              <Avatar
                className={styles.avatar}
                width="25px"
                image={crush.attributes.toUser?.attributes.profilePicture?.url()}
              />
              <Text
                className={styles.usernameText}
                text={`@${crush.attributes.toUser.attributes.username} `}
              />
              <p className={styles.text}> recibio un Crush secreto</p>
            </FlexRow>
          </Link>
        </FlexRow>
      ) : (
        <FlexRow className={styles.title}>
          <Link
            to={"/app/profile/" + crush.attributes.createdBy.id}
            style={{ textDecoration: "none" }}
          >
            <FlexRow>
              <Avatar
                className={styles.avatar}
                width="25px"
                image={crush.attributes.createdBy?.attributes.profilePicture?.url()}
              />
              <Text
                className={styles.usernameText}
                text={`@${crush.attributes.createdBy.attributes.username} `}
              />
            </FlexRow>
          </Link>
          <p className={styles.text}> tiene un Crush en </p>

          <Link
            to={"/app/profile/" + crush.attributes.toUser.id}
            style={{ textDecoration: "none" }}
          >
            <FlexRow>
              <Avatar
                className={styles.avatar}
                width="25px"
                image={crush.attributes.toUser?.attributes.profilePicture?.url()}
              />
              <Text
                className={styles.usernameText}
                text={`@${crush.attributes.toUser.attributes.username} `}
              />
            </FlexRow>
          </Link>
        </FlexRow>
      )}
      <FlexRow alignItems="center">
        <Moment className={styles.date} format="MMMM DD, YYYY" locale="es">
          {crush.attributes.createdAt}
        </Moment>
      </FlexRow>
      <FlexRow>
        <Text text={crush.attributes.text} />
      </FlexRow>
    </FlexColumn>
  );
}

export default CrushHeader;
