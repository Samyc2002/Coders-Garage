import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD6ACzbbWtjZoOiKMnHMZ_Ejm8CrMevVOw",
    authDomain: "coders-garage.firebaseapp.com",
    projectId: "coders-garage",
    storageBucket: "coders-garage.appspot.com",
    messagingSenderId: "367308198211",
    appId: "1:367308198211:web:3c6cfa7e3b00a30a249ff6",
    measurementId: "G-BE3HJJF2VJ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;