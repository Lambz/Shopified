// Firebase App (the core Firebase SDK)
import firebase from "firebase/app";

//Firebase services
import "firebase/auth";
import "firebase/firestore";

// global variables

window.codes = {
    NULL_VALUE: -5,
    NULL_OBJECT: -10,
    INSERTION_SUCCESS: 3,
    INSERTION_FAILIURE: -3;
    UPDATE_SUCCESS: 1,
    UPDATE_FAILIURE: -1,
    NOT_FOUND: 404,
    FETCH_FAILURE: -300,
    FETCH_SUCCESS: 300
}

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

// 
// MARK: User Account Functions for User and Seller
// 

// Signup function

function signupWithEmail(user) {
    if (!user) {
        throw new Error(`Signup Error! Error code: ${window.codes.NULL_OBJECT}`);
        return
    }
    // [START auth_signup_password]
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then((userCredential) => {
        // Signed in 
        let loggedUser = userCredential.user;
        return loggedUser;
    })
    .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        throw new Error(`Firebase Signup Error! Error code: ${errorCode}\n Error Message: ${errorMessage}`);
        return null;
    });
    // [END auth_signup_password]
}

// Sign-in Function

function signInWithEmail(email, password) {
    if (!email || !password) {
        throw new Error(`Signin Error! Error code: ${window.codes.NULL_VALUE}`);
    }
        // [START auth_signin_password]
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        let loggedUser = userCredential.user;
        return loggedUser;
    })
    .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        throw new Error(`Firebase Signin Error! Error code: ${errorCode}\nError Message: ${errorMessage}`);
        return null;
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
        throw new Error(`Error sending reset password email! Error Code: ${errorCode}\nErrorMessage: ${errorMessage}`);
      });

  }

// User Data Insertion Functions

function createUserObjectInDB(user) {
    if (!user) {
        throw new Error(`User Insertion Error! Error code: ${window.codes.NULL_OBJECT}`);
    }
    db.collection('users').doc(user.email).set(user)
    .then(() => {
        console.log("User Added!");
        return window.codes.INSERTION_SUCCESS;
    })
    .catch((error) => {
        console.log(`User insertion error! Error code: ${error.errorCode}\nError Messsage: ${error.errorMessage}`);
        return window.codes.INSERTION_FAILIURE;
    });
}

function createSellerObjectInDB(user) {
    if (!user) {
        throw new Error(`Seller Insertion Error! Error code: ${window.codes.NULL_OBJECT}`);
    }
    db.collection('sellers').doc(user.email).set(user)
    .then(() => {
        console.log("Seller Added!");
        return window.codes.INSERTION_SUCCESS;
    })
    .catch((error) => {
        console.log(`Seller insertion error! Error code: ${error.errorCode}\nError Messsage: ${error.errorMessage}`);
        return window.codes.INSERTION_FAILIURE;
    });
}

// User Query functions

function getUserDetails(email) {
    if (!email) {
        throw new Error(`User Email Null! Error code: ${window.codes.NULL_VALUE}`);
        return;
    }
    
    let userDocument = db.collection('users').doc(email);
    userDocument.get().then((doc) => {
        if (doc.exists) {
            return doc.data();
        } else {
            return window.codes.NOT_FOUND;
        }
    })
    .catch ((error) => {
        console.log(`Details fetching error! Error code: ${error.errorCode}\nError Messsage: ${error.errorMessage}`);
        return null;
    });
}

function getSellerDetails(email) {
    if (!email) {
        throw new Error(`Seller Email Null! Error code: ${window.codes.NULL_VALUE}`);
        return;
    }
    
    let userDocument = db.collection('sellers').doc(email);
    userDocument.get().then((doc) => {
        if (doc.exists) {
            return doc.data();
        } else {
            return window.codes.NOT_FOUND;
        }
    })
    .catch ((error) => {
        console.log(`Details fetching error! Error code: ${error.errorCode}\nError Messsage: ${error.errorMessage}`);
        return null;
    });
}

//  User details Update Functions

function updateDBPassword(password) {
    let user = firebase.auth().currentUser;
    
    user.updatePassword(password).then(function() {
      return window.codes.UPDATE_SUCCESS;
    }).catch(function(error) {
      throw new Error(`Password updation Error! Error code: ${error.errorCode}\nError Message: ${error.errorMessage}`);
      return window.codes.UPDATE_FAILIURE;
    });
}

function updateDBEmail(email) {
    let user = firebase.auth().currentUser;

    user.updateEmail(email).then(function() {
      return window.codes.UPDATE_SUCCESS;
    }).catch(function(error) {
      throw new Error(`Email updation failiure! Error code: ${error.errorCode}\nError Message: ${error.errorMessage}`);
      return window.codes.UPDATE_FAILIURE;
    });
}

// 
// MARK: DB CRUD transactions functions
// 

// Insertion functions

function insertProductInDB(product) {
    if (!product) {
        throw new Error(`Product insertion error! Error code: ${window.codes.NULL_OBJECT}`);
        return;
    }
    let category = product.category;
    let subcategory = product.subcateogry;
    db.collection('products').doc(category).doc(subcategory).doc(product.id).set(product)
    .then(() => {
        console.log("Product Added!");
        return window.codes.INSERTION_SUCCESS;
    })
    .catch((error) => {
        console.log(`Product insertion error! Error code: ${error.errorCode}\nError Messsage: ${error.errorMessage}`);
        return window.codes.INSERTION_FAILIURE;
    });
}

function insertCategoryOrSubcategoryInDB(category) {
    if (!category) {
        throw new Error(`Category Insertion Error! Error code: ${window.codes.NULL_OBJECT}`);
    }
    db.collection('categories').doc(category.name).set(category.subcategories)
    .then(() => {
        console.log("Category Added!");
        return window.codes.INSERTION_SUCCESS;
    })
    .catch((error) => {
        console.log(`Category insertion error! Error code: ${error.errorCode}\nError Messsage: ${error.errorMessage}`);
        return window.codes.INSERTION_FAILIURE;
    });
}

// Fetch functions

function fetchCategoriesAndSubcategoriesFromDB() {
    let refernece = db.collection('categories');
    refernece.get().then((doc) => {
        if (doc.exists) {
            return doc.data();
        }
        else {
            return window.codes.NOT_FOUND;
        }
    })
    .catch((error) => {
        console.log(`Category fetch error! Error code: ${error.errorCode}\nError Messsage: ${error.errorMessage}`);
        return window.codes.FETCH_FAILURE;
    })
}

function fetchProductsForSubCategoryFromDB(category, subcategory) {
    let refernece = db.collection('products').doc(category).doc(subcategory);
    refernece.get().then((doc) => {
        if(doc.exists)
            return doc.data();
        else
            return window.codes.NOT_FOUND;
    })
    .catch((error) => {
        console.log(`Product fetch error! Error code: ${error.errorCode}\nError Messsage: ${error.errorMessage}`);
        return window.codes.FETCH_FAILURE;
    })
}


module.exports = { add };