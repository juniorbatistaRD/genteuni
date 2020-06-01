import Parse from "parse";

const Message = Parse.Object.extend("Message");
const query = new Parse.Query(Message);

export const saveMessage = async (values) => {
  const message = new Message();

  return await message.save(values);
};

export const getMessagesByConversationId = async (id) => {
  const query = new Parse.Query(Message);
  const queryConversation = new Parse.Query("Conversation");

  const conversation = await queryConversation.get(id);
  query.equalTo("conversation", conversation);
  const result = await query.find();

  return result;
};

export const getMessagesWithPagination = async ({
  startFrom,
  queryData,
  perPage,
}) => {
  const query = new Parse.Query(Message);
  const queryConversation = new Parse.Query("Conversation");

  const conversation = await queryConversation.get(queryData);

  query.equalTo("conversation", conversation);
  query.skip(startFrom);
  query.include("createdBy");
  query.descending("createdAt");
  query.limit(perPage);
  query.withCount();
  const result = await query.find();

  return result;
};

export default query;
