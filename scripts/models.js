// Model classes for objects
// import { codes, updateDBEmail, updateDBPassword } from './firebaseHandlers.js';

// global vars

const OrderStatus = Object.freeze({
    "PENDING": 0,
    "PROCESSING": 1,
    "ON_WAY": 2,
    "DELEIVERED": 3,
    "CANCELLED": 4
});

// classes and converters

class User {
    constructor(name, age, email, password) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.password = password;
        this.orders = [];
    }
}

var userConverter = {
    toFirestore: function(user) {
        return {
            name: user.name,
            age: user.age,
            email: user.email,
            password: user.password,
            orders: user.orders
            };
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new User(data.name, data.age, data.email, data.password, data.orders);
    }
};

class Seller {
    constructor(name, company, email, password) {
        this.name = name;
        this.company = company;
        this.email = email;
        this.password = password;
        this.products = [];
    }
}

var sellerConverter = {
    toFirestore: function(user) {
        return {
            name: user.name,
            company: user.company,
            email: user.email,
            password: user.password,
            products: user.products
            };
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new Seller(data.name, data.company, data.email, data.password, data.products);
    }
};

class Product {
    constructor(name, id, category, subcategory, price, seller, seller_id, estimatedTime, images, quantity, description) {
        this.name = name;
        this.id = id;
        this.category = category;
        this.subcategory = subcategory;
        this.price = price;
        this.seller = seller;
        this.seller_id = seller_id;
        this.estimatedTime = estimatedTime;
        this.images = images;
        this.quantity = quantity;
        this.description = description;
    }
}

var productConverter = {
    toFirestore: function(product) {
        return {
            name: product.name,
            id: product.id,
            category: product.category,
            subcategory: product.subcategory,
            price: product.price,
            seller: product.seller,
            seller_id: product.seller_id,
            estimatedTime: product.estimatedTime,
            images: product.images,
            quantity: product.quantity,
            description: product.description
            };
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new Product(data.name, data.id, data.category, data.subcategory, data.price, data.seller, data.seller_id, data.estimatedTime, data.images, data.quantity, data.description);
    }
};

class Category {
    constructor(name, subcategories) {
        this.name = name;
        this.subcategories = subcategories;
    }
}

var categoryConverter = {
    toFirestore: function(category) {
        return {
            name: category.name,
            subcategories: category.subcategories
            };
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new Category(data.name, data.subcategories);
    }
};


class Order {
    constructor(products) {
        this.products = products;
        this.status = OrderStatus.PENDING;
    }
}



// export { User, Seller, Product, Category }


