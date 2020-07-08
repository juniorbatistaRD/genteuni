import React, { useContext } from "react";
import styles from "./AnswersSection.module.css";
import AddAnswerForm from "./AddAnswerForm";
import useInfiniteScrolling from "../../../../hooks/useInfinteScrolling";
import { getAnswersWithPagination } from "../../../../data/queryAnswers";
import InfiniteScroll from "react-infinite-scroller";
import Spinner from "../../../../components/common/Spinner";
import Comment from "../../../../components/Comment";
import FlexColumn from "../../../../components/common/FlexColumn";
import FlexRow from "../../../../components/common/FlexRow";
import Text from "../../../../components/common/Text";
import Button from "../../../../components/common/Button";
import { pickAnswer, deleteAnswer } from "../../../../data/queryQuestions";
import { AuthContext } from "../../../../contexts/AuthContext";
import { ReactComponent as CorrectIcon } from "../../../../assets/icons/correct.svg";
import Title from "../../../../components/common/Title";
import { ReactComponent as TrashIcon } from "../../../../assets/icons/trash.svg";

function AnswersSection({ question }) {
  const {
    items,
    startFrom,
    count,
    nextPage,
    reloadData,
    isLoading,
  } = useInfiniteScrolling({
    query: getAnswersWithPagination,
    queryData: question,
    perPage: 10,
  });
  const { currentUser } = useContext(AuthContext);

  const shouldShowButton = (answer) => {
    if (currentUser?.id !== question.attributes.createdBy.id) return false;
    if (currentUser?.id === answer.attributes.createdBy.id) return false;
    if (question.attributes.answer) return false;

    return true;
  };

  const selectAnswer = (data) => {
    pickAnswer(data);
    reloadData();
  };

  const unselectAnswer = () => {
    deleteAnswer({ question });
    reloadData();
  };

  return (
    <FlexColumn>
      {question.attributes.answer ? (
        <FlexColumn alignItems="center">
          <FlexRow alignItems="center">
            <CorrectIcon width="19px" height="18px" />
            <Title text="Respuesta Selecionada"></Title>
          </FlexRow>
          {currentUser?.id === question.attributes.createdBy.id && (
            <FlexRow alignItems="center" onClick={unselectAnswer}>
              <TrashIcon width="12px" height="12px" fill="#dc7e7e" />
              <Text text="Quitar Como Respuesta Selecionada" color="#dc7e7e" />
            </FlexRow>
          )}

          <Comment
            style={{ width: "-webkit-fill-available" }}
            margin="15px 0px "
            date={question.attributes.answer.attributes.createdAt}
            user={question.attributes.answer.attributes.createdBy}
            text={question.attributes.answer.attributes.text}
          />
          <Title text="Otras Respuestas"></Title>
        </FlexColumn>
      ) : (
        <>
          <Title text="Respuestas"></Title>
          {currentUser && (
            <AddAnswerForm reloadData={reloadData} question={question} />
          )}
        </>
      )}
      {!isLoading && (
        <InfiniteScroll
          loadMore={nextPage}
          hasMore={startFrom < count}
          loader={<Spinner />}
        >
          {items.map((item) => (
            <Comment
              key={item.id}
              margin="15px 0px "
              date={item.attributes.createdAt}
              user={item.attributes.createdBy}
              text={
                <FlexColumn>
                  <Text text={item.attributes.text} />
                  {shouldShowButton(item) && (
                    <Button
                      typeStyle="secondary"
                      onClick={() => selectAnswer({ answer: item, question })}
                    >
                      Marcar Como Respuesta
                    </Button>
                  )}
                  {item.id === question.attributes.answer?.id && (
                    <FlexRow alignItems="center">
                      <CorrectIcon width="19px" height="18px" />
                      <Text text="Respuesta Selecionada" fontSize="15px" />
                    </FlexRow>
                  )}
                </FlexColumn>
              }
            />
          ))}
        </InfiniteScroll>
      )}
    </FlexColumn>
  );
}

export default AnswersSection;
