const axios = require("axios");

Parse.Cloud.define("sendNotifications", async (request) => {
  axios.post(
    "https://fcm.googleapis.com/fcm/send",
    {
      notification: {
        title: "I Love Madeline",
        body: "She is the custest!",
        click_action: "http://localhost:3000/",
        icon:
          "https://scontent.fhex4-1.fna.fbcdn.net/v/t1.0-9/91414002_2969236679786228_1948702953699278848_o.jpg?_nc_cat=100&_nc_sid=09cbfe&_nc_eui2=AeHZeiu0p-sPdSbrLOHkI6Fcf_IduDd54xR_8h24N3njFOZQsMFH74rIUuWrfOgPKchKTwNf_k3yNlRunKC_2-X9&_nc_ohc=FpC0HcbKy_8AX9GLJ3Z&_nc_ht=scontent.fhex4-1.fna&oh=d6faa722ef7159b21b9c32bda392b32b&oe=5EB3A48F",
      },
      to:
        "fRjTh9wAF9_BCvo08m-SD-:APA91bHTYUmN8phEeYfNIimYxItSzdvL26wkWfJmSxqpSIA42GM8sqgLt2gjMrxnxgMsYZo_Fku3h0m209J3T7jOzqIWY_HdiH9Spo-igK7I8UU6Ei2FVcTAeCB7vUw8NyX8D3qFVVDB",
    },
    {
      headers: {
        Authorization:
          "key=AAAAn6fU-W4:APA91bFv8JinmvQYWfU_Db4qNbU2wx9QvokI9N8a8UEaDQ_HtuBlFM4R-_ZR6UWHG43VDo4kHYl0M2yU_A5FiBQZ4eQX-5VyTzJq1joTCD6BoSpyr1l6i9ajYgb3i9i5uvycqhTyIdgL",
      },
    }
  );
});
