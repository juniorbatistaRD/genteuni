import React, { useEffect, useState } from "react";
import styles from "./ShowJob.module.css";
import { getQuestionById } from "../../../data/queryQuestions";
import Spinner from "../../../components/common/Spinner";
import { useParams } from "react-router-dom";
import FlexColumn from "../../../components/common/FlexColumn";
import QuestionHeader from "../../../components/QuestionHeader";
import RenderHTML from "../../../components/RenderHTML";
import { getJobById } from "../../../data/queryJobs";
// import AnswersSection from "./AnswersSection";

function ShowJob() {
  const { id } = useParams();
  const [question, setQuestion] = useState();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const result = await getJobById(id);
      setQuestion(result);
      setIsloading(false);
    };

    getData();
  }, []);

  return (
    <FlexColumn margin="10px">
      {isLoading ? (
        <Spinner />
      ) : (
        <FlexColumn>
          <QuestionHeader question={question} listItem={false} />
          <FlexColumn className={styles.content}>
            <article>
              <RenderHTML json={question.attributes} />
            </article>
          </FlexColumn>
          {/* <AnswersSection question={question} /> */}
        </FlexColumn>
      )}
    </FlexColumn>
  );
}

export default ShowJob;
