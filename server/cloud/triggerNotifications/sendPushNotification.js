const axios = require("axios");

//get data with need for the notification
Parse.Cloud.beforeSave("Notification", async (req, res) => {
  req.context = {
    triggeredBy: req.object.get("triggeredBy"),
    forUser: req.object.get("forUser"),
    text: req.object.get("text"),
    type: req.object.get("type"),
  };
});

Parse.Cloud.afterSave("Notification", async (req, res) => {
  const query = new Parse.Query(Parse.User);
  const user = await query.get(req.context.forUser.id);

  const sendPush = (notification, to) => {
    axios.post(
      "https://fcm.googleapis.com/fcm/send",
      {
        notification,
        to,
      },
      {
        headers: {
          Authorization:
            "key=AAAAn6fU-W4:APA91bFv8JinmvQYWfU_Db4qNbU2wx9QvokI9N8a8UEaDQ_HtuBlFM4R-_ZR6UWHG43VDo4kHYl0M2yU_A5FiBQZ4eQX-5VyTzJq1joTCD6BoSpyr1l6i9ajYgb3i9i5uvycqhTyIdgL",
        },
      }
    );
  };

  if (user.attributes.notificationsToken) {
    let notification;

    switch (req.context.type) {
      case "PROFILE_COMMENT":
        notification = {
          title: "💌 Alguien comento en tu perfil",
          body: req.context.text,
          click_action: "https://gente-uni.firebaseapp.com/app/me/comments",
          icon: "https://unigente.back4app.io/images/noti.png",
        };
        break;
      case "POST_COMMENT":
        notification = {
          title: " 💬 Alguien comento en una de tus publicaciones",
          body: req.context.text,
          click_action: "https://gente-uni.firebaseapp.com/app/me",
          icon: "https://unigente.back4app.io/images/noti.png",
        };
        break;
      case "POST_LIKE":
        notification = {
          title: "👍 Alguien le gusto tu post",
          body: "Alguien le gusto tu post",
          click_ation: "https://gente-uni.firebaseapp.com/app/notifications",
          icon: "https://unigente.back4app.io/images/noti.png",
        };
        break;
      case "FOLLOW":
        notification = {
          title: "Alguien te ha empezado a seguir",
          body: "Entra a genteuni para ver quien fue",
          click_ation: "https://gente-uni.firebaseapp.com/app/notifications",
          icon: "https://unigente.back4app.io/images/noti.png",
        };
        break;
      case "GIFT":
        notification = {
          title: " 🎁 Recibiste un regalo",
          body: "Entra a genteuni para ver que fue",
          click_ation: "https://gente-uni.firebaseapp.com/app/notifications",
          icon: "https://unigente.back4app.io/images/noti.png",
        };
        break;
      case "QUESTION_ANSWER":
        notification = {
          title: "❓ Alguien Respondio Tu Pregunta",
          body: "Entra a genteuni para ver que fue",
          click_ation: "https://gente-uni.firebaseapp.com/app/notifications",
          icon: "https://unigente.back4app.io/images/noti.png",
        };
        break;
      default:
        notification = {
          title: "Tienes una nueva notificacion",
          body: req.context.text,
          click_ation: "https://gente-uni.firebaseapp.com/app/notifications",
          icon: "http://unigente.back4app.io/images/noti.png",
        };
    }

    const token = user.attributes.notificationsToken;
    sendPush(notification, token);
  } else {
    console.log("No tiene token");
  }
});
