import { useContext } from "react";
import firebase from "firebase";
import { AuthContext } from "../contexts/AuthContext";

function usePushNotifications() {
  const { currentUser } = useContext(AuthContext);

  const askForPermissioToReceiveNotifications = async () => {
    try {
      const messaging = firebase.messaging();
      await messaging.requestPermission();
      const token = await messaging.getToken();

      if (currentUser.attributes.notificationsToken !== token) {
        currentUser.set("notificationsToken", token);
        currentUser.save();
      }

      return token;
    } catch (e) {
      console.error(e);
    }
  };

  return askForPermissioToReceiveNotifications;
}

export default usePushNotifications;
