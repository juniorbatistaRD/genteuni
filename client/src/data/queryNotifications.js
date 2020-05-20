import Parse from "parse";

const Notification = Parse.Object.extend("Notification");
const query = new Parse.Query(Notification);

export const getUnreadNumberOfNotifications = async (user) => {
  const serverUrl =
    process.env.NODE_ENV !== "production"
      ? "ws://localhost:1337"
      : "wss://unigente.back4app.io";

  const client = new Parse.LiveQueryClient({
    applicationId: process.env.REACT_APP_ID,
    serverURL: serverUrl, // Example: 'wss://livequerytutorial.back4app.io'
    javascriptKey: process.env.REACT_JAVASCRIPT_KEY,
  });
  client.open();
  const query = new Parse.Query("Notification");

  query.equalTo("forUser", user);
  query.equalTo("wasSeen", false);

  const amount = await query.count();
  const subscrition = await client.subscribe(query);

  return { amount, subscrition };
};

export const readNotifications = async (user) => {
  const query = new Parse.Query("Notification");

  query.equalTo("forUser", user);
  query.equalTo("wasSeen", false);

  query.each(function (obj) {
    obj.set("wasSeen", true);
    obj.save();
    console.log(obj);
  }, {});
};

export const getUserNotificationsWithPagination = async ({
  startFrom,
  perPage,
  user,
}) => {
  const query = new Parse.Query(Notification);

  query.equalTo("forUser", user);
  query.skip(startFrom);
  query.include("triggeredBy");
  query.descending("createdAt");
  query.limit(perPage);
  query.withCount();

  const result = await query.find();

  return result;
};

export default query;
