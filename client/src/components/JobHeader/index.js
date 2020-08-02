import React from "react";
import styles from "./JobHeader.module.css";
import FlexColumn from "../common/FlexColumn";
import FlexRow from "../common/FlexRow";
import Text from "../common/Text";
import Avatar from "../common/Avatar";
import Moment from "react-moment";
import extractTextFromPost from "../../helpers/extractTextFromPost";
import { ReactComponent as AreaIcon } from "../../assets/icons/area.svg";
import { ReactComponent as PinIcon } from "../../assets/icons/pin.svg";
import { useNavigate } from "react-router-dom";

function JobHeader({ job, listItem }) {
  const navigate = useNavigate();

  return (
    <FlexColumn
      className={styles.header}
      onClick={() => {
        if (listItem) navigate("/app/job/" + job.id);
      }}
    >
      <h1 className={styles.title}>{job.attributes.title}</h1>

      <FlexRow alignItems="center">
        <Moment className={styles.date} format="MMMM DD, YYYY" locale="es">
          {job.attributes.createdAt}
        </Moment>
        <Text text="|" />
        <Avatar
          onClick={
            () => {}
            // navigate("/app/profile/" + job.attributes.createdBy.id)
          }
          className={styles.avatar}
          width="25px"
          image={job.attributes.createdBy?.attributes.profilePicture?.url()}
        />
        <Text
          className={styles.usernameText}
          text={`@${job.attributes.createdBy.attributes.username}`}
          onClick={
            () => {}
            // navigate("/app/profile/" + job.attributes.createdBy.id)
          }
        />
      </FlexRow>
      <FlexRow alignItems="center">
        <PinIcon width="15px" height="15px" />
        <Text text={job.attributes.country.attributes.name} />
      </FlexRow>
      <FlexRow alignItems="center">
        <AreaIcon width="15px" height="15px" />
        <Text text={job.attributes.area.attributes.name} />
      </FlexRow>
      <FlexRow>
        {listItem && (
          <Text text={extractTextFromPost(job.attributes.content.blocks)} />
        )}
      </FlexRow>
    </FlexColumn>
  );
}

export default JobHeader;
