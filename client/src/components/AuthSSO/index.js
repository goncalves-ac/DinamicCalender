import firebase from "firebase";

export const authMethods = {
  GOOGLE: "google",
  FACEBOOK: "facebook",
  GITHUB: "github"
};

export const providerObject = (provider) => {
  switch (provider) {
    case authMethods.GOOGLE:
      return new firebase.auth.GoogleAuthProvider();
    case authMethods.FACEBOOK:
      return new firebase.auth.FacebookAuthProvider();
    case authMethods.GITHUB:
      return new firebase.auth.GithubAuthProvider();
    default:
      return null;
  }
};

export default function AuthSSO() {
  return firebase;
}
