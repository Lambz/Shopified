// // Firebase App (the core Firebase SDK)
// import firebase from "firebase/app";

// //Firebase services
// import "firebase/auth";
// import "firebase/firestore";

// // imports
// import { User, Seller, Product, Category } from './models.js';

// global variables

var codes = Object.freeze({
    NULL_VALUE: -5,
    NULL_OBJECT: -10,
    INSERTION_SUCCESS: 3,
    INSERTION_FAILIURE: -3,
    UPDATE_SUCCESS: 1,
    UPDATE_FAILIURE: -1,
    NOT_FOUND: 404,
    FETCH_FAILURE: -300,
    FETCH_SUCCESS: 300,
    LOGIN_SUCCESS: 400,
    LOGIN_FAILIURE: -400,
    LOGOUT_SUCCESS: 102,
    LOGOUT_FAILIURE: -102
});

// config token for firebase access
var firebaseConfig = {
    apiKey: "AIzaSyBNBlPV5qBRTtnpz-5URhrHEMpjRxW1HnU",
    authDomain: "shopified-11a20.firebaseapp.com",
    databaseURL: "https://shopified-11a20-default-rtdb.firebaseio.com/",
    projectId: "shopified-11a20",
    storageBucket: "shopified-11a20.appspot.com",
    messagingSenderId: "490634575459",
    appId: "1:490634575459:web:0e4c2db29bdb6e075a4256",
    measurementId: "G-80PJX71W15"
};

var app = null;
var db = null;

// Global initialization for firebase
function initializeDB() {
    app = firebase.initializeApp(firebaseConfig);
    db = firebase.firestore(app);
    console.log("DB initialized!");
}


// 
// MARK: User Account Functions for User and Seller
// 

// Signup function

function signupWithEmail(user, callback, uiCallback) {
    if (!user) {
        throw new Error(`Signup Error! Error code: ${codes.NULL_OBJECT}`);
        return
    }
    // [START auth_signup_password]
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then((userCredential) => {
        // Signed in 
        let loggedUser = userCredential.user.uid;
        sessionStorage.setItem("uid", loggedUser);
        sessionStorage.setItem("user", user);
        return callback(user, uiCallback);
    })
    .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        throw new Error(`Firebase Signup Error! Error code: ${errorCode}\n Error Message: ${errorMessage}`);
    });
    // [END auth_signup_password]
}

// Sign-in Function

function signInWithEmail(email, password, callback, uiCallback) {
    if (!email || !password) {
        throw new Error(`Signin Error! Error code: ${codes.NULL_VALUE}`);
    }
        // [START auth_signin_password]
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        let loggedUser = userCredential.user.uid;
        sessionStorage.setItem("uid", loggedUser);
        return callback(uiCallback);
    })
    .catch((error) => {
        throw new Error(`Firebase Signin Error! Error code: ${error.code}\nError Message: ${error.message}`);
    });
    // [END auth_signin_password]
}

// Sign out function

function signOutUserFromFirebase(uiCallback) {
    firebase.auth().signOut()
    .then(() => {
        console.log("Logged out!");
        sessionStorage.setItem("uid", null);
        // UIcallback implementation
        return codes.LOGOUT_SUCCESS;
    })
    .catch((error) => {
        return codes.LOGOUT_FAILIURE;
    });
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

function createUserObjectInDB(user, uiCallback) {
    if (!user) {
        throw new Error(`User Insertion Error! Error code: ${codes.NULL_OBJECT}`);
    }
    db.collection('users').doc(sessionStorage.getItem("uid")).withConverter(userConverter).set(user)
    .then(() => {
        console.log("User Added!");
        uiCallback(codes.INSERTION_SUCCESS);
        return codes.INSERTION_SUCCESS;
    })
    .catch((error) => {
        console.log(`User insertion error! Error code: ${error.errorCode}\nError Messsage: ${error.errorMessage}`);
        uiCallback(ccodes.INSERTION_FAILIURE);
        return codes.INSERTION_FAILIURE;
    });
}

function createSellerObjectInDB(user, uiCallback) {
    if (!user) {
        console.log("user");
        throw new Error(`Seller Insertion Error! Error code: ${codes.NULL_OBJECT}`);
    }

    db.collection('sellers').doc(sessionStorage.getItem("uid")).withConverter(sellerConverter).set(user)
    .then(() => {
        console.log("Seller Added!");
        uiCallback(codes.INSERTION_SUCCESS);
        return codes.INSERTION_SUCCESS;
    })
    .catch((error) => {
        console.log(`Seller insertion error! Error code: ${error.errorCode}\nError Messsage: ${error.errorMessage}`);
        uiCallback(ccodes.INSERTION_FAILIURE);
        return codes.INSERTION_FAILIURE;
    });
}

// User Query functions

function getUserDetails(uiCallback) {
    if (!sessionStorage.getItem("uid")) {
        throw new Error(`User Credentials Null! Error code: ${codes.NULL_VALUE}`);
    }
    
    let userDocument = db.collection('users').doc(sessionStorage.getItem("uid"));
    userDocument.withConverter(userConverter).get()
    .then((doc) => {
        if (doc.exists) {
            // uiCallback

            return doc.data();
        } else {
            return codes.NOT_FOUND;
        }
    })
    .catch ((error) => {
        console.log(`Details fetching error! Error code: ${error.errorCode}\nError Messsage: ${error.errorMessage}`);
        return codes.FETCH_FAILURE;
    });
}

function getSellerDetails(uiCallback) {
    if (!sessionStorage.getItem("uid")) {
        throw new Error(`Seller Email Null! Error code: ${codes.NULL_VALUE}`);
    }
    
    let userDocument = db.collection('sellers').doc(sessionStorage.getItem("uid"));
    userDocument.withConverter(sellerConverter).get()
    .then((doc) => {
        if (doc.exists) {
            console.log(doc.data());
            // uiCallback
            uiCallback();

            return doc.data();
        } else {
            return codes.NOT_FOUND;
        }
    })
    .catch ((error) => {
        console.log(`Details fetching error! Error code: ${error.errorCode}\nError Messsage: ${error.errorMessage}`);
        return codes.FETCH_FAILURE;
    });
}

//  User details Update Functions

function updateDBPassword(password) {
    let user = firebase.auth().currentUser;
    
    user.updatePassword(password).then(function() {
      return codes.UPDATE_SUCCESS;
    }).catch(function(error) {
      throw new Error(`Password updation Error! Error code: ${error.errorCode}\nError Message: ${error.errorMessage}`);
      return codes.UPDATE_FAILIURE;
    });
}

function updateDBEmail(email) {
    let user = firebase.auth().currentUser;

    user.updateEmail(email).then(function() {
      return codes.UPDATE_SUCCESS;
    }).catch(function(error) {
      throw new Error(`Email updation failiure! Error code: ${error.errorCode}\nError Message: ${error.errorMessage}`);
      return codes.UPDATE_FAILIURE;
    });
}

// 
// MARK: DB CRUD transactions functions
// 

// Insertion functions

function insertProductInDB(product, seller, uiCallback) {
    if (!product) {
        throw new Error(`Product insertion error! Error code: ${codes.NULL_OBJECT}`);
        return;
    }
    let category = product.category;
    let subcategory = product.subcateogry;
    db.collection(`products/${category}/${subcategory}`).doc(product.id).withConverter(productConverter).set(product)
    .then(() => {
        console.log("Product Added!");
        seller.products.push(product);
        createSellerObjectInDB(seller, uiCallback);
        return codes.INSERTION_SUCCESS;
    })
    .catch((error) => {
        console.log(`Product insertion error! Error code: ${error.errorCode}\nError Messsage: ${error.errorMessage}`);
        return codes.INSERTION_FAILIURE;
    });
}

function insertCategoryOrSubcategoryInDB(category) {
    if (!category) {
        throw new Error(`Category Insertion Error! Error code: ${codes.NULL_OBJECT}`);
    }
    db.collection('categories').doc(category.name).withConverter(categoryConverter).set(category)
    .then(() => {
        console.log("Category Added!");
        return codes.INSERTION_SUCCESS;
    })
    .catch((error) => {
        console.log(`Category insertion error! Error code: ${error.errorCode}\nError Messsage: ${error.errorMessage}`);
        return codes.INSERTION_FAILIURE;
    });
}

// Fetch functions

function fetchCategoriesAndSubcategoriesFromDB(uiCallback) {
    let reference = db.collection('categories');
    let resultArray = [];
    reference.withConverter(categoryConverter).get().then((querySnapshot) => {
        querySnapshot.forEach(doc => {
            if (doc.exists) {
                resultArray.push(doc.data());
            }
            else {
                return codes.NOT_FOUND;
            }
        })
        uiCallback(resultArray);
    })
    .catch((error) => {
        console.log(`Category fetch error! Error code: ${error.errorCode}\nError Messsage: ${error.errorMessage}`);
        uiCallback(codes.FETCH_FAILURE);
        return codes.FETCH_FAILURE;
    })
}

function fetchProductsForSubCategoryFromDB(category, subcategory, uiCallback) {
    let reference = db.collection('products').doc(category).doc(subcategory);
    reference.get().then((doc) => {
        if(doc.exists)
            return doc.data();
        else
            return codes.NOT_FOUND;
    })
    .catch((error) => {
        console.log(`Product fetch error! Error code: ${error.errorCode}\nError Messsage: ${error.errorMessage}`);
        return codes.FETCH_FAILURE;
    })
}

function fetchCategoryDataFromDB(category, callback) {
    let reference = db.collection('categories').doc(category);
    reference.withConverter(categoryConverter).get()
    .then((doc) => {
        callback(doc.data());
        return codes.FETCH_SUCCESS;
    })
    .catch((error) => {
        console.log(`Category fetch error! Error code: ${error.code}\nError Message: ${error.message}`);
        return codes.FETCH_FAILURE;
    })
}


// export { codes, firebaseConfig, initializeDB, signupWithEmail, signInWithEmail, sendPasswordReset,
//     createUserObjectInDB, createSellerObjectInDB, getUserDetails, getSellerDetails, updateDBPassword,
//     updateDBEmail, insertProductInDB, insertCategoryOrSubcategoryInDB, fetchCategoriesAndSubcategoriesFromDB,
//     fetchProductsForSubCategoryFromDB }
