import React, { useEffect, useState, useContext } from "react";
import styles from "./ShowJob.module.css";
import Spinner from "../../../components/common/Spinner";
import { useParams } from "react-router-dom";
import FlexColumn from "../../../components/common/FlexColumn";
import RenderHTML from "../../../components/RenderHTML";
import { getJobById } from "../../../data/queryJobs";
import JobHeader from "../../../components/JobHeader";
import Text from "../../../components/common/Text";
import FlexRow from "../../../components/common/FlexRow";
import ApplicationsSection from "../ApplicationsSection";
import { AuthContext } from "../../../contexts/AuthContext";
import JobApplicationsList from "../JobApplicationsList";
import DeleteJobButton from "./DeleteJobButton";

function ShowJob() {
  const { id } = useParams();
  const [job, setJob] = useState();
  const [isLoading, setIsloading] = useState(true);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      const result = await getJobById(id);
      setJob(result);
      setIsloading(false);
    };

    getData();
  }, [id]);

  return (
    <FlexColumn margin="10px">
      {isLoading ? (
        <Spinner />
      ) : (
        <FlexColumn>
          <JobHeader job={job} />
          {currentUser?.id === job.attributes.createdBy.id && (
            <FlexRow margin="0px 0px 10px 0px">
              <DeleteJobButton job={job} />
            </FlexRow>
          )}

          <FlexColumn className={styles.content}>
            <FlexColumn margin="10px">
              <FlexRow>
                <Text
                  text={`Ubicacion: ${job.attributes.country.attributes.name}`}
                />
              </FlexRow>
              <FlexRow>
                <Text text={`Area: ${job.attributes.area.attributes.name}`} />
              </FlexRow>
            </FlexColumn>

            <article>
              <RenderHTML json={job.attributes} />
            </article>
          </FlexColumn>
          {currentUser?.id === job.attributes.createdBy.id ? (
            <JobApplicationsList job={job} />
          ) : (
            currentUser && <ApplicationsSection job={job} />
          )}
        </FlexColumn>
      )}
    </FlexColumn>
  );
}

export default ShowJob;
