import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCeIgnxHidW50b6z8k_0nAreYN7k7UlRCE",
  authDomain: "calendario-dinamico.firebaseapp.com",
  databaseURL: "https://calendario-dinamico.firebaseio.com",
  projectId: "calendario-dinamico",
  storageBucket: "calendario-dinamico.appspot.com",
  messagingSenderId: "819456309995",
  appId: "1:819456309995:web:54d4089493407670a31cae",
};

try {
  firebase.initializeApp(firebaseConfig);
  firebase.auth().languageCode = "pt-BR";
} catch (err) {
  console.log(err);
}

export const authMethods = {
  GOOGLE: "google",
  FACEBOOK: "facebook",
};

const providerObject = (provider) => {
  switch (provider) {
    case authMethods.GOOGLE:
      return new firebase.auth.GoogleAuthProvider();
      break;
    case authMethods.FACEBOOK:
      return new firebase.auth.FacebookAuthProvider();
      break;
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
    .catch((result) => {
      console.log("Error");
      let error = {
        errorMessage: null,
        errorCode: null,
      };
      console.log(error);
    });
}
