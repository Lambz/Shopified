// Interface functions implemented for front-end scripts

// import { codes, firebaseConfig, initializeDB, signupWithEmail, signInWithEmail, sendPasswordReset,
//     createUserObjectInDB, createSellerObjectInDB, getUserDetails, getSellerDetails, updateDBPassword,
//     updateDBEmail, insertProductInDB, insertCategoryOrSubcategoryInDB, fetchCategoriesAndSubcategoriesFromDB,
//     fetchProductsForSubCategoryFromDB } from './firebaseHandlers.js';

// import { User, Product, Seller, Category } from './models.js';

// 
// MARK: Authentication Methods
// 

// Signup functions for User and Seller
// 1. args:
// - user: user object
// - isUser: boolean for checking if user or seller signing up
// - uiCallback: to call once user has signed up and Object created (or error), to update UI
// 2. returns:
// 3. throws:
// - No

function signUp(user, isUser, uiCallback) {
    let functionToCall;
    if (isUser)
        functionToCall = createUserObjectInDB;
    else 
        functionToCall = createSellerObjectInDB;
    try {
        return signupWithEmail(user, functionToCall, uiCallback);
    }
    catch (error) {
        return codes.NULL_OBJECT;
    }
}

// Signin function for user and seller
// 1. args:
// - email: user email
// - password: user password
// - isUser: boolean for checking if user or seller signing in
// - uiCallback: to update UI once sign-in done and user details fetched (or error)
// 2. returns:
// 3. throws
// - No

function signIn(email, password, isUser, uiCallback) {
    let functionToCall;
    if (isUser)
        functionToCall = getUserDetails;
    else 
        functionToCall = getSellerDetails;
    try {
        return signInWithEmail(email, password, functionToCall, uiCallback);
    }
    catch (error) {
        return codes.LOGIN_FAILIURE;
    }
}

// Signout function for users
// 1. args:
// - uiCallback: to update UI after logged out or error in logging out
// 2. returns
// - LOGIN_SUCCESS: for successful logout
// - LOGIN_FAILURE: for logout errors

function signOut(uiCallback) {
    return signOutUserFromFirebase(uiCallback);
}

// 
// MARK: CRUD operations for products and categories
// 



function fetchAllProducts() {
    let categoryData = fetchCategoriesAndSubcategoriesFromDB();
    if (categoryData == codes.FETCH_FAILURE || codes.NOT_FOUND) {
        return codes.FETCH_FAILURE;
    }
    console.log(categoryData);
}

// Function to insert product
// args:
// - product: product object
// 
// 

function insertProduct(product, category, uiCallback) {
//  insert images
    let i = 0;
    let storageRef = [];
    // for (i = 0, i < product.images.length, i++)
    // storageRef.push(firebase.storage().ref(`products/${product.id}`).child(`${product.id}-${i}`));

// insert category/subcategory
    try {
        insertCategoryOrSubcategoryInDB(category, callback);
        // insert product
        try {
            return insertProductInDB(product, uiCallback);
        }
        catch(error) {
            return codes.INSERTION_FAILIURE;
        }
    }
    catch(error) {

    }
}

// Function to delete a product

function deleteProduct(productid) {

}

let user = new Seller("Name", "Company", "SomeEmail@NameCompanyMail.com", "Password");
let category = new Category("some other category", ["sub2"]);
initializeDB();
signIn(user.email, user.password, false, () => {
    document.getElementById("text").style.display = "block";
    insertCategoryOrSubcategoryInDB(category);
} );







