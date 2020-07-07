import Parse from "parse";

const Question = Parse.Object.extend("Question");
const AreaObject = Parse.Object.extend("Area");
const query = new Parse.Query(Question);

export const saveQuestion = async ({ title, content, area, postOnSchool }) => {
  const question = new Question();
  const queryArea = new Parse.Query(AreaObject);

  const fetchedArea = await queryArea.get(area);

  question.set("title", title);
  question.set("content", content);
  question.set("area", fetchedArea);
  question.set("postOnSchool", postOnSchool);
  const result = await question.save();

  return result;
};

export const getQuestionById = async (id) => {
  const query = new Parse.Query(Question);
  query.include("createdBy");
  query.include("answer");

  const result = await query.get(id);

  return result;
};

export const pickAnswer = async ({ answer, question }) => {
  const getQuestion = new Parse.Query(Question);

  const fetchedQuestion = await getQuestion.get(question.id);
  fetchedQuestion.set("answer", answer);

  await fetchedQuestion.save();
};

export default query;
