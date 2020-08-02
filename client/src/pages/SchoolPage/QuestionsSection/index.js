import React, { useState, useContext } from "react";
import FlexColumn from "../../../components/common/FlexColumn";
import Title from "../../../components/common/Title";
import FlexRow from "../../../components/common/FlexRow";
import useInfiniteScrolling from "../../../hooks/useInfinteScrolling";
import { getQuestionsWithPagination } from "../../../data/queryQuestions";
import Button from "../../../components/common/Button";
import Text from "../../../components/common/Text";
import { Form, Formik } from "formik";
import { SelectArea } from "../../../components/formikFields";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../contexts/AuthContext";
import InfiniteScroll from "react-infinite-scroller";
import Spinner from "../../../components/common/Spinner";
import QuestionHeader from "../../../components/QuestionHeader";

const QuestionsSection = ({ school }) => {
  const [area, setArea] = useState();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const { items, nextPage, count, startFrom, isLoading } = useInfiniteScrolling(
    {
      query: getQuestionsWithPagination,
      queryData: area,
      user: school,
      perPage: 10,
    }
  );

  return (
    <FlexColumn>
      <Title text="Preguntas" />

      <FlexRow alignItems="center">
        {currentUser && (
          <Button onClick={() => navigate("/app/question/create")}>
            Hacer Pregunta
          </Button>
        )}

        <Formik initialValues={{ area: "" }}>
          <Form
            onChange={(e) => {
              if (e.target.name === "area") setArea(e.target.value);
            }}
          >
            <FlexRow alignItems="center" margin="10px 10px">
              <Text text="Area:" />
              <SelectArea name="area" placeholder="Todos" />
            </FlexRow>
          </Form>
        </Formik>
      </FlexRow>

      <FlexRow justifyContent="center">
        <Title
          text="Ayuda A Responder Estas Preguntas:"
          typeStyle="secondary"
        />
      </FlexRow>
      {isLoading ? (
        <Spinner />
      ) : (
        <InfiniteScroll
          loadMore={nextPage}
          loader={<Spinner />}
          hasMore={startFrom < count}
        >
          {items.map((item) => (
            <QuestionHeader question={item} listItem={true} key={item.id} />
          ))}
        </InfiniteScroll>
      )}
      {!isLoading && count < 1 && <p>No hay preguntas disponibles</p>}
    </FlexColumn>
  );
};

export default QuestionsSection;
