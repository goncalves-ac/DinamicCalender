import firebase from "firebase";
import { v4 as uuid } from "uuid";

const storage = firebase.storage;

class FirebaseStorageService {
  async upload({ image }) {
    const storageRef = storage().ref();
    const imageName = this.generateFileName(image.name);
    const imageUploadRef = storageRef.child(`images/${imageName}`);
    await imageUploadRef.put(image);
    const uploadedImageUrl = imageUploadRef.getDownloadURL();
    return uploadedImageUrl;
  }

  async clean({ imageName }) {
    const storageRef = storage().ref();
    const imageRef = storageRef.child(`images/${imageName}`);
    try {
      imageRef.delete().then(() => {
        return { status: "OK" };
      });
    } catch (err) {
      return { status: "ERROR", error: err };
    }
  }

  generateFileName(originalName) {
    const firstParse = originalName.replace("images%2F|[?]", "");
    const withoutSpaces = firstParse.replace(/ /g, "");
    const hash = uuid();
    return `${hash}-${withoutSpaces}`;
  }
}

export default FirebaseStorageService;
