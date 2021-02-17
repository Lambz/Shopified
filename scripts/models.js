// Model classes for objects
import './firebaseHandlers';

class User {
    constructor(name, age, email, password) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.password = password;
        // this.image = '';
    }

    updateName(name) {
        this.name = name;
        // implement method to save the object to firebase
    }
    // method to save password to firebase
    updatePassword(password) {
        if(updateDBPassword(password) == window.codes.UPDATE_SUCCESS) {
            this.password = password;
            return window.codes.UPDATE_SUCCESS;
        }
        else {
            return window.codes.UPDATE_FAILIURE;
        }
    }

    updateEmail(email) {
        if(updateDBEmail(email) == window.codes.UPDATE_SUCCESS) {
            this.email = email;
            return window.codes.UPDATE_SUCCESS;
        }
        else {
            return window.codes.UPDATE_FAILIURE;
        }
    }
}

class Seller {
    constructor(name, company, email, password) {
        this.name = name;
        this.company = company;
        this.email = email;
        this.password = password;
    }

    updateCompany(company) {
        this.company = company;
    }
    updatePassword(password) {
        if(updateDBPassword(password) == window.codes.UPDATE_SUCCESS) {
            this.password = password;
            return window.codes.UPDATE_SUCCESS;
        }
        else {
            return window.codes.UPDATE_FAILIURE;
        }
    }

    updateEmail(email) {
        if(updateDBEmail(email) == window.codes.UPDATE_SUCCESS) {
            this.email = email;
            return window.codes.UPDATE_SUCCESS;
        }
        else {
            return window.codes.UPDATE_FAILIURE;
        }
    }

    addProduct() {

    }

    getProducts() {

    }

    removeProducts() {

    }
}

class Product {
    constructor(name, id, category, price, seller, estimatedTime) {
        this.name = name;
        this.id = id;
        this.category = category;
        this.price = price;
        this.seller = seller;
        this.estimatedTime = estimatedTime;
    }

    updatePrice(price) {
        this.price = price;
        // code to update object
    }
}

class Category {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
}

