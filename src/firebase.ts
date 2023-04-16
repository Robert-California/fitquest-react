import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {

    apiKey: "AIzaSyCSZsMvx0vnxVOyAOFGw-QllLYLwpHyGAs",

    authDomain: "fitquest-react.firebaseapp.com",

    databaseURL: "https://fitquest-react-default-rtdb.firebaseio.com",

    projectId: "fitquest-react",

    storageBucket: "fitquest-react.appspot.com",

    messagingSenderId: "844815545145",

    appId: "1:844815545145:web:f870cd3462515d9828eee8",

    measurementId: "G-H3L83XGLEH"

};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export default firestore;