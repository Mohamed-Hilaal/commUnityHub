import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCqUxjEeL5MNyh06TSsLP9GW-0TmTicrqA",
    authDomain: "communityhub-162b0.firebaseapp.com",
    projectId: "communityhub-162b0",
    storageBucket: "communityhub-162b0.firebasestorage.app",
    messagingSenderId: "875601109917",
    appId: "1:875601109917:web:b14145e8836a1762680574",
    measurementId: "G-BEM078M503"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default app;
export { db };
