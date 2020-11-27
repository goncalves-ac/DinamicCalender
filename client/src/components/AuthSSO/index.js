import firebase from "firebase";

export const authMethods = {
  GOOGLE: "google",
  FACEBOOK: "facebook",
};

const providerObject = (provider) => {
  switch (provider) {
    case authMethods.GOOGLE:
      return new firebase.auth.GoogleAuthProvider();
    case authMethods.FACEBOOK:
      return new firebase.auth.FacebookAuthProvider();
    default:
      return null;
  }
};

export default function AuthSSO(provider) {
  let user = {
    uid: null,
    nome: null,
    email: null,
    fotoPerfil: null,
  };

  firebase
    .auth()
    .signInWithPopup(providerObject(provider))
    .then((result) => {
      console.log("Sucesso");
      user.uid = result.user.uid;
      user.nome = result.user.displayName;
      user.email = result.user.email;
      user.fotoPerfil = result.user.photoURL;
      console.log(user);
    })
    .catch((err) => {
      console.error(err);
    });
}
