import React, { useEffect, useState } from "react";
import styles from "./ShowQuestion.module.css";
import { getQuestionById } from "../../../data/queryQuestions";
import Spinner from "../../../components/common/Spinner";
import { useParams } from "react-router-dom";
import FlexColumn from "../../../components/common/FlexColumn";
import QuestionHeader from "../../../components/QuestionHeader";
import RenderHTML from "../../../components/RenderHTML";
import Title from "../../../components/common/Title";
import AnswersSection from "./AnswersSection";

function ShowQuestion() {
  const { id } = useParams();
  const [question, setQuestion] = useState();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const result = await getQuestionById(id);
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
          <AnswersSection question={question} />
        </FlexColumn>
      )}
    </FlexColumn>
  );
}

export default ShowQuestion;
