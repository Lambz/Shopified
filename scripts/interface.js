// Interface functions implemented for front-end scripts

import { codes, firebaseConfig, initializeDB, signupWithEmail, signInWithEmail, sendPasswordReset,
    createUserObjectInDB, createSellerObjectInDB, getUserDetails, getSellerDetails, updateDBPassword,
    updateDBEmail, insertProductInDB, insertCategoryOrSubcategoryInDB, fetchCategoriesAndSubcategoriesFromDB,
    fetchProductsForSubCategoryFromDB } from './firebaseHandlers';

// 
// MARK: Authentication Methods
// 

// Signup functions for User and Seller
// args:
// - user: user object
// - isUser: boolean for checking if user or seller signing up

function signUp(user, isUser) {
    let functionToCall;
    if (isUser)
        functionToCall = createUserObjectInDB;
    else 
        functionToCall = createSellerObjectInDB;
    try {
        let credentials = firebase.signupWithEmail();
        if (credentials) {
            sessionStorage.setItem("uid") = credentials;
            sessionStorage.setItem("user") = user;
            try {
                return firebase.functionToCall(user);
            }
            catch (error) {
                return codes.INSERTION_FAILIURE;
            }
        }
        else {
            return codes.NULL_VALUE
        }
    }
    catch (error) {
        return codes.NULL_OBJECT;
    }
}

// Signin function for user and seller
// args:
// - email: user email
// - password: user password
// -isUser: boolean for checking if user or seller signing in

function signIn(email, password, isUser) {
    let functionToCall;
    if (isUser)
        functionToCall = getUserDetails;
    else 
        functionToCall = getSellerDetails;
    try {
        let credentials =  signInWithEmail(email, password);
        if (credentials) {
            sessionStorage.setItem("uid") = credentials;
            try {
                let user = functionToCall(email);
                if (user) {
                    sessionStorage.setItem("user") = user;
                    return codes.FETCH_SUCCESS;
                }
                else                
                    return codes.FETCH_FAILURE;
            }
            catch (error) {
                return codes.NULL_OBJECT;
            }  
        }
        else {
            return codes.NULL_VALUE;
        }
    }
    catch (error) {
        return codes.NULL_OBJECT;
    }
}

// 
// MARK: CRUD operations for products and categories
// 

// Function to insert product
// args:
// - product: product object
// - isNewCategoryOrSubcategory: boolean to check weather new category
// ...arguments is for category object if new category or subcategory (only one argument supported)

function fetchAllProducts() {
    let categoryData = fetchCategoriesAndSubcategoriesFromDB();
    if (categoryData == codes.FETCH_FAILURE || codes.NOT_FOUND) {
        return codes.FETCH_FAILURE;
    }
    console.log(categoryData);
}


function insertProduct(product, isNewCategoryOrSubcategory, ... arguments) {
    if (isNewCategoryOrSubcategory) {
        try {
            if (insertCategoryOrSubcategoryInDB(arguments[0]) == codes.INSERTION_FAILIURE)
                return codes.INSERTION_FAILIURE;
        }
        catch(error) {
            return codes.INSERTION_FAILIURE;
        }
    }
    try {
        return insertProductInDB(product);
    }
    catch(error) {
        return codes.INSERTION_FAILIURE;
    }
}

// Function to delete a product

function deleteProduct(productid) {

}

let user = new Seller("Name", "Company", "Email", "Password");
initializeDB();
console.log(signUp(user, false));
console.log(sessionStorage.getItem("user"));

