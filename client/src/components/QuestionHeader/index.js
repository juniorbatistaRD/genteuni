import React from "react";
import styles from "./QuestionHeader.module.css";
import FlexColumn from "../common/FlexColumn";
import FlexRow from "../common/FlexRow";
import Title from "../common/Title";
import Text from "../common/Text";
import Avatar from "../common/Avatar";
import Moment from "react-moment";
import extractTextFromPost from "../../helpers/extractTextFromPost";
import { ReactComponent as CorrectIcon } from "../../assets/icons/correct.svg";
import { useNavigate } from "react-router-dom";

function QuestionHeader({ question, listItem }) {
  const navigate = useNavigate();
  return (
    <FlexColumn
      className={styles.header}
      onClick={() => {
        if (listItem) navigate("/app/question/" + question.id);
      }}
    >
      <h1 className={styles.title}>{question.attributes.title}</h1>
      {question.attributes.answer && (
        <FlexRow alignItems="center">
          <CorrectIcon width="25px" height="25px" />
          <Text text="Respondida" fontSize="18px" />
        </FlexRow>
      )}

      <FlexRow alignItems="center">
        <Moment className={styles.date} format="MMMM DD, YYYY" locale="es">
          {question.attributes.createdAt}
        </Moment>
        <Text text="|" />
        <Avatar
          onClick={
            () => {}
            // navigate("/app/profile/" + question.attributes.createdBy.id)
          }
          className={styles.avatar}
          width="25px"
          image={question.attributes.createdBy?.attributes.profilePicture?.url()}
        />
        <Text
          className={styles.usernameText}
          text={`@${question.attributes.createdBy.attributes.username}`}
          onClick={
            () => {}
            // navigate("/app/profile/" + question.attributes.createdBy.id)
          }
        />
      </FlexRow>
      <FlexRow>
        {listItem && (
          <Text
            text={extractTextFromPost(question.attributes.content.blocks)}
          />
        )}
      </FlexRow>
    </FlexColumn>
  );
}

export default QuestionHeader;
