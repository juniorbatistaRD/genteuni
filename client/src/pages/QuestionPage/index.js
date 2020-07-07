import React from "react";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router";

const QuestionPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate("/app/question/create")}>
        Crear Pregunta
      </Button>
    </div>
  );
};

export default QuestionPage;
