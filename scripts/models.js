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
    }
   
    updatePassword(password) {
        try {
            if(updateDBPassword(password) == window.codes.UPDATE_SUCCESS) {
                this.password = password;
                return window.codes.UPDATE_SUCCESS;
            }
        }
        catch(error) {
            return window.codes.UPDATE_FAILIURE;
        }
    }

    updateEmail(email) {
        try {
            if(updateDBEmail(email) == window.codes.UPDATE_SUCCESS) {
                this.email = email;
                return window.codes.UPDATE_SUCCESS;
            }
        }
        catch(error) {
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
        try {
            if(updateDBPassword(password) == window.codes.UPDATE_SUCCESS) {
                this.password = password;
                return window.codes.UPDATE_SUCCESS;
            }
        }
        catch(error) {
            return window.codes.UPDATE_FAILIURE;
        }
    }

    updateEmail(email) {
        try {
            if(updateDBEmail(email) == window.codes.UPDATE_SUCCESS) {
                this.email = email;
                return window.codes.UPDATE_SUCCESS;
            }
        }
        catch(error) {
            return window.codes.UPDATE_FAILIURE;
        }
    }
}

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


