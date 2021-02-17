// Firebase App (the core Firebase SDK)
import firebase from "firebase/app";

//Firebase services
import "firebase/auth";
import "firebase/firestore";

// global variables

const NULL_OBJECT = -1;

// config token for firebase access
let firebaseConfig = {
    apiKey: "AIzaSyBNBlPV5qBRTtnpz-5URhrHEMpjRxW1HnU",
    authDomain: "shopified-11a20.firebaseapp.com",
    databaseURL: "https://shopified-11a20-default-rtdb.firebaseio.com/",
    projectId: "shopified-11a20",
    storageBucket: "shopified-11a20.appspot.com",
    messagingSenderId: "490634575459",
    appId: "1:490634575459:web:0e4c2db29bdb6e075a4256",
    measurementId: "G-80PJX71W15"
};

// Global initialization for firebase
firebase.initializeApp(firebaseConfig);

// MARK: Signup Functions for User and Seller

function signupUserWithEmail(user) {
    if (!user) {
        throw `User Signup Error! Error code: ${NULL_OBJECT}`;
        return
    }
    // [START auth_signup_password]
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then((userCredential) => {
        // Signed in 
        let loggedUser = userCredential.user;
        showLoggedInPageUser(loggedUser);
    })
    .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        throw `Firebase Signup Error! Error code: ${errorCode}\n Error Message: ${errorMessage}`;
        return
    });
    // [END auth_signup_password]
}


function signupSellerWithEmail(seller) {
    if (!seller) {
        throw `Seller Signup Error! Error code: ${NULL_OBJECT}`;
        return
    }
    // [START auth_signup_password]
    firebase.auth().createUserWithEmailAndPassword(seller.email, seller.password)
    .then((sellerCredentials) => {
        // Signed in 
        let loggedSeller = sellerCredentials.user;
        showLoggedInPageSeller(loggedSeller);
    })
    .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        throw `Firebase Signup Error! Error code: ${errorCode}\nError Message: ${errorMessage}`;
        return
    });
    // [END auth_signup_password]
}

// Sign-in Functions

function signInUserWithEmail(user) {
    if (!user) {
        throw `User Signin Error! Error code: ${NULL_OBJECT}`;
    }
        // [START auth_signin_password]
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then((userCredential) => {
        // Signed in
        let loggedUser = userCredential.user;
        showLoggedInPageUser(user);
    })
    .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
    });
    // [END auth_signin_password]
}

function signinSellerWithEmail(seller) {
    if (!seller) {
        throw `Seller Signin Error! Error code: ${NULL_OBJECT}`;
    }
        // [START auth_signin_password]
    firebase.auth().signInWithEmailAndPassword(seller.email, seller.password)
    .then((sellerCredential) => {
        // Signed in
        let loggedSeller = sellerCredential.user;
        showLoggedInPageSeller(loggedSeller);
    })
    .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
    });
    // [END auth_signin_password]
}

// Password Reset Function

function sendPasswordReset(email) {
    
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        showResetPasswordPromt();
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        throw `Error sending reset password email! Error Code: ${errorCode}\nErrorMessage: ${errorMessage}`;
      });

  }


// Helper Methods

function showLoggedInPageUser(user) {

}

function showLoggedInPageSeller(seller) {

}

function showResetPasswordPromt() {

}

