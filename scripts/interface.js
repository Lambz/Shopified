// Interface functions implemented for front-end scripts

import './firebaseHandlers';

// 
// MARK: Authentication Methods
// 

// Signup functions for User and Seller

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

// ...arguments is for category object (only one argument supported)

function insertProduct(product, isNewCategory, isNewSubcategory, ... arguments) {
    if (isNewCategory || isNewSubcategory) {
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

function deleteProduct(productid) {

}

module.exports = { add };

