Parse.Cloud.define("hello", async (request) => {
  console.log(request, "hello");
});

require("./readAllNotifications");
require("./readAllMessages");
require("./sendMessageToUser");

//school
require("./getSchoolAverageRating");
require("./school/getSchoolRankingList");

//validations
require("./validations");

//assign default role
require("./addDefaultRoleToUser");

//notifcations
require("./sendNotification");
require("./triggerNotifications");

//messaging
require("./messaging/setLastMessageInConversation");
