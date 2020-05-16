import { useContext } from "react";
import firebase from "firebase";
import { AuthContext } from "../contexts/AuthContext";

function usePushNotifications() {
  const { currentUser } = useContext(AuthContext);

  const askForPermissioToReceiveNotifications = async () => {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    currentUser.set("notificationsToken", token);
    currentUser.save();

    return token;
  };

  return askForPermissioToReceiveNotifications;
}

export default usePushNotifications;
