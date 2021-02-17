// Model classes for objects
class User {
    constructor(name, age, email, password) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.password = password;
    }

    updateName(name) {
        this.name = name;
        // implement method to save the object to firebase
    }

    updatePassword(password) {
        this.password = password;
        // implement method to save object to firebase
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
        this.password = password;
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

