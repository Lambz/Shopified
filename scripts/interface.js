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
// Creates the user/ seller object in collection
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
    signInWithEmail(email,password,() => {
        getUserDetails(isUser,uiCallback);
    });
}


// Function to update user data
// 1. args:
// - isUser: boolean, checks weather user or seller
// - user: user/seller object
// - uiCallback: callback function for updating UI
// 2. returns:
// 3. throws
// - No

function updateUser(isUser, user, uiCallback)
{
    if(isUser)
    {
        createUserObjectInDB(user,uiCallback);
    }
    else
    {
        createSellerObjectInDB(user,uiCallback);
    }
}


// Function to update user or seller passoword

function updatePassword(isUser, user, newPassword, uiCallback)
{
    let functionToCall;
    if(isUser)
    {
        functionToCall = createUserObjectInDB;
    }
    else
    {
        functionToCall = createSellerObjectInDB;
    }
    updateDBPassword(newPassword,() => {
        user.password = newPassword;
        functionToCall(user,uiCallback);
    });
}

// Signout function for users
// 1. args:
// - isUser: boolean, check weather the user or seller logging out
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


// Query Functions


// Function to fetch all categories and subcategories from DB
// 1. args:
// - uiCallback: callback for updating UI after data has been fetched
// 2. throws:
// No
// Note: uiCallback is provided with an array if query is successfully executed
// FETCH_FAILURE if error 
function fetchAllCategoriesAndSubcategories(uiCallback) {
    fetchCategoriesAndSubcategoriesFromDB(uiCallback);
}


// Function to fetch the product by product id
// 1. args
function fetchProductById(productID, uiCallback) {
    fetchProductByIdInDB(productID, uiCallback);
}

function fetchAllProductsForSubcategory(subcategoryID, uiCallback) {
    fetchProductsForSubCategoryFromDB(subcategoryID, uiCallback);
}

function fetchAllProductsForCategory(categoryID, uiCallback) {
    fetchProductsForCategoryInDB(categoryID, uiCallback);
}

function fetchAllProducts(uiCallback) {
    fetchAllProductsInDB(uiCallback);
}

function fetchSalesDataForSeller() {

}



// Insertion Functions

// function to upload images
// 1. args:
// - product: product id for image
// - image: BLOB data for images
// - uiCallback: for updating ui, could be non-ui updating too


function insertImage(product, images, uiCallback) {
    //  insert images
    var downloadedUrls = [];
    for (let i=0; i < images.length; i++) {
        insertImageInDB(product, i, images[i], (url) => {
            downloadedUrls.push(url);
            console.log(url);
            if (downloadedUrls.length == images.length) {
                uiCallback(downloadedUrls);
            }
        });
    }
    
}

// Function to insert product
// inserts product to product and seller collection
// 1. args:
// - product: product object
// - seller: seller object (w/o the new product added)
// - updateCategory: Boolean, true if new category or subcategory added
// - uiCallback: callback function to update UI

function insertProduct(product, seller, updateCategory, uiCallback) {
    if (updateCategory) {
        getCategoryObjectAndUpdateCategory(product.category, product.subcategory);
    }
    try {
        return insertProductInDB(product, seller, uiCallback);
    }
    catch(error) {
        return codes.INSERTION_FAILIURE;
    }
}

// fetches current logged in user details
// 1. args:
// - isUser: boolean, specifies weather user or seller logged in
// - uiCallback: for ui updation after fetching details
// 

function getUserDetails(isUser, uiCallback) {
    if (isUser) {
        return getUserDetailsFromDB(uiCallback);
    }
    else {
        return getSellerDetailsFromDB(uiCallback);
    }
}

// Helper function for insert product to update category if new category or subcategory added
// by user, Not called directly
function getCategoryObjectAndUpdateCategory(categoryName, subcategoryName) {
    return fetchCategoryDataFromDB(categoryName, (categoryObject) => {
        try {
            if(categoryObject) {
                console.log(categoryObject);
                categoryObject.subcategories.push(subcategoryName);
                insertCategoryOrSubcategoryInDB(categoryObject);
            }
            else {
                let category = new Category(categoryName, [subcategoryName]);
                insertCategoryOrSubcategoryInDB(category);
            }
        }
        catch(error) {
            console.log(codes.FETCH_FAILURE);
        }
    });
}



// Deletion Functions

// Function to delete a product

function deleteProduct(productID, seller, uiCallback) {
    deleteProductFromDB(productID,seller,uiCallback);
}

// Order Functions

function placeOrder(order, uiCallback) {
    insertOrderInDB(order, uiCallback);
}
// 1. args:
// - order: order object
// 
function updateOrderStatus(order, newStatus, uiCallback) {
    order.status = newStatus;
    insertOrderInDB(order, uiCallback);
}

// Function to return all orders for a seller
function fetchOrdersForSeller(sellerID, startDate, endDate, includeCancelled, uiCallback) {
    fetchOrdersForSellerByDateFromDB(startDate, endDate, includeCancelled, (orders) => {
        let orderArray = orders.filter(order => order.seller == sellerID);
        uiCallback(orderArray);
    })
}


let user = new Seller("Name", "Company", "SomeEmail@NameCompanyMail.com", "Password");
// // let category = new Category("some other category", ["sub2"]);
initializeDB(); 
// // console.log(user);
// // signUp(user, false, () => {});

signIn(user.email, user.password, false, ()=> {});
let product = new Product("A", "someId", "new category", "some subcategory", "10", user.name, sessionStorage.getItem("uid"), "2", [], 100, "some");

// insertProduct(product, user, false, ()=> {

// })
deleteProduct("someId", user, () => {});



