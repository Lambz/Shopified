// Model classes for objects
// import { codes, updateDBEmail, updateDBPassword } from './firebaseHandlers.js';

class User {
    constructor(name, age, email, password) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.password = password;
    }

    updateName(name) {
        this.name = name;
    }
   
    updatePassword(password) {
        try {
            if(updateDBPassword(password) == codes.UPDATE_SUCCESS) {
                this.password = password;
                return codes.UPDATE_SUCCESS;
            }
        }
        catch(error) {
            return codes.UPDATE_FAILIURE;
        }
    }

    updateEmail(email) {
        try {
            if(updateDBEmail(email) == codes.UPDATE_SUCCESS) {
                this.email = email;
                return codes.UPDATE_SUCCESS;
            }
        }
        catch(error) {
            return codes.UPDATE_FAILIURE;
        }
    }
}

var userConverter = {
    toFirestore: function(user) {
        return {
            name: user.name,
            age: user.age,
            email: user.email,
            password: user.password
            };
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new User(data.name, data.age, data.email, data.password);
    }
};

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
        try {
            if(updateDBPassword(password) == codes.UPDATE_SUCCESS) {
                this.password = password;
                return codes.UPDATE_SUCCESS;
            }
        }
        catch(error) {
            return codes.UPDATE_FAILIURE;
        }
    }

    updateEmail(email) {
        try {
            if(updateDBEmail(email) == codes.UPDATE_SUCCESS) {
                this.email = email;
                return codes.UPDATE_SUCCESS;
            }
        }
        catch(error) {
            return codes.UPDATE_FAILIURE;
        }
    }
}

var sellerConverter = {
    toFirestore: function(user) {
        return {
            name: user.name,
            company: user.company,
            email: user.email,
            password: user.password
            };
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new Seller(data.name, data.company, data.email, data.password);
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

    updatePrice(price) {
        this.price = price;
    }

    setQuantity(quantity) {
        this.quantity = quantity;
    }
}

class Category {
    constructor(name, subcategories) {
        this.name = name;
        this.subcategories = subcategories;
    }
    
    addSubcategory(subCategory) {
        this.subcategories.push(subCategory);
    }
}

// export { User, Seller, Product, Category }


