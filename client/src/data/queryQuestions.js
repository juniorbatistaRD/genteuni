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
  question.set("answer", answer);

  await question.save();
};

export const deleteAnswer = async ({ question }) => {
  question.set("answer", null);

  await question.save();
};

export const getQuestionsWithPagination = async ({
  startFrom,
  queryData,
  perPage,
  user,
}) => {
  const query = new Parse.Query(Question);
  const queryArea = new Parse.Query("Area");

  if (queryData) {
    const areaResult = await queryArea.get(queryData);
    query.equalTo("area", areaResult);
  }

  // query.equalTo("school", queryData);
  query.skip(startFrom);
  query.include("area");
  query.include("createdBy");
  query.descending("createdAt");
  query.limit(perPage);
  query.withCount();
  const result = await query.find();

  return result;
};

export default query;
