// Interface functions implemented for front-end scripts

import './firebaseHandlers';

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
        let credentials = signupWithEmail();
        if (credentials) {
            sessionStorage.setItem("uid") = credentials;
            sessionStorage.setItem("user") = user;
            try {
                return functionToCall(user);
            }
            catch (error) {
                return window.codes.INSERTION_FAILIURE;
            }
        }
        else {
            return window.codes.NULL_VALUE
        }
    }
    catch (error) {
        return window.codes.NULL_OBJECT;
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
                    return window.codes.FETCH_SUCCESS;
                }
                else                
                    return window.codes.FETCH_FAILURE;
            }
            catch (error) {
                return window.codes.NULL_OBJECT;
            }  
        }
        else {
            return window.codes.NULL_VALUE;
        }
    }
    catch (error) {
        return window.codes.NULL_OBJECT;
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
    if (categoryData == window.codes.FETCH_FAILURE || window.codes.NOT_FOUND) {
        return window.codes.FETCH_FAILURE;
    }
    console.log(categoryData);
}


function insertProduct(product, isNewCategoryOrSubcategory, ... arguments) {
    if (isNewCategoryOrSubcategory) {
        try {
            if (insertCategoryOrSubcategoryInDB(arguments[0]) == window.codes.INSERTION_FAILIURE)
                return window.codes.INSERTION_FAILIURE;
        }
        catch(error) {
            return window.codes.INSERTION_FAILIURE;
        }
    }
    try {
        return insertProductInDB(product);
    }
    catch(error) {
        return window.codes.INSERTION_FAILIURE;
    }
}

// Function to delete a product

function deleteProduct(productid) {

}

module.exports = { add };

