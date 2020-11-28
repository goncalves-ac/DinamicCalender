import firebase from "firebase";
import api from "../../api";

export const authMethods = {
  GOOGLE: "google",
  FACEBOOK: "facebook",
};

export const providerObject = (provider) => {
  switch (provider) {
    case authMethods.GOOGLE:
      return new firebase.auth.GoogleAuthProvider();
    case authMethods.FACEBOOK:
      return new firebase.auth.FacebookAuthProvider();
    default:
      return null;
  }
};

export default function AuthSSO() {
    return firebase;
}
