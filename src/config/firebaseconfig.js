// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB5nGZs-t7Jd3gsxCV74CqkSpKuibhxIm8",
    authDomain: "todo-database-react.firebaseapp.com",
    projectId: "todo-database-react",
    storageBucket: "todo-database-react.appspot.com",
    messagingSenderId: "822577457006",
    appId: "1:822577457006:web:d0907e5028c4eae6f1837f",
    measurementId: "G-RGXT3DD8EM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;