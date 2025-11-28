import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore , doc, setDoc , collection, addDoc , increment,onSnapshot,deleteDoc    } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";








const firebaseConfig = {
    apiKey: "AIzaSyALFeL4HyB-v09IroJfQyyDipTR48_SUDg",
    authDomain: "storage-6e263.firebaseapp.com",
    projectId: "storage-6e263",
    storageBucket: "storage-6e263.firebasestorage.app",
    messagingSenderId: "743184590510",
    appId: "1:743184590510:web:1d7dc34c3e7248f77f2f3f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { initializeApp , getFirestore , db ,    doc, setDoc , collection, addDoc , increment , onSnapshot , deleteDoc  } 