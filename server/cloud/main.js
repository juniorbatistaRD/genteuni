Parse.Cloud.define("hello", async (request) => {
  console.log(request, "hello");
});
require("./readAllNotifications");

//validations
require("./validations");

//assign default role
require("./addDefaultRoleToUser");

require("./sendNotification");
require("./triggerNotifications");
