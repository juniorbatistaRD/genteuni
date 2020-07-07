import Parse from "parse";

const Answer = Parse.Object.extend("Answer");
export const query = new Parse.Query(Answer);

export const saveAnswer = ({ text, question }) => {
  const answer = new Answer();
  answer.set("text", text);
  answer.set("question", question);
  return answer.save();
};

export const getAnswersWithPagination = async ({
  startFrom,
  queryData,
  perPage,
}) => {
  const query = new Parse.Query(Answer);
  query.equalTo("question", queryData);
  query.skip(startFrom);
  query.include("createdBy");
  query.descending("createdAt");
  query.limit(perPage);
  query.withCount();
  const result = await query.find();

  return result;
};

export default query;
