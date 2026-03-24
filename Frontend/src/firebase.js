import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD_hudkV1DC-e0TXhpK9peSgilYhbckRyI",
    authDomain: "lostfoundry-26b90.firebaseapp.com",
    projectId: "lostfoundry-26b90",
    storageBucket: "lostfoundry-26b90.appspot.com",
    messagingSenderId: "761760352428",
    appId: "1:761760352428:web:a639de16755f4a00e5f709"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

