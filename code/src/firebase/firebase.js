// initializes and exports firebase database and authentication

// import requires modules
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

// firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBehKF152E5XJdsZf-Yzj5PBaX3DOiFeRk",
    authDomain: "ultimate-seat-selector-15f36.firebaseapp.com",
    databaseURL: "https://ultimate-seat-selector-15f36-default-rtdb.firebaseio.com",
    projectId: "ultimate-seat-selector-15f36",
    storageBucket: "ultimate-seat-selector-15f36.appspot.com",
    messagingSenderId: "167830181105",
    appId: "1:167830181105:web:d497c2636b8edba5088550",
    measurementId: "G-G8QNWC8T4R"
};

// initialize the database configuration and authentication
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// export database & authentication
export { app, auth };