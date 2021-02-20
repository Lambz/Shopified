var firebaseConfig = {
    apiKey: "AIzaSyBNBlPV5qBRTtnpz-5URhrHEMpjRxW1HnU",
    authDomain: "shopified-11a20.firebaseapp.com",
    databaseURL: "https://shopified-11a20-default-rtdb.firebaseio.com/",
    projectId: "shopified-11a20",
    storageBucket: "shopified-11a20.appspot.com",
    messagingSenderId: "490634575459",
    appId: "1:490634575459:web:0e4c2db29bdb6e075a4256",
    measurementId: "G-80PJX71W15"
};
// Initialize Firebase

window.onload = function () {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    var database = firebase.database();
    if (window.location.href.includes("index")) {
        // console.log(sessionStorage.getItem("uid"));
        if (sessionStorage.getItem("uid") != null) {
            window.location.replace("dashboard.html");
        }
    }
    else {
        if (sessionStorage.getItem("uid") == null) {
            window.location.replace("index.html");
        }
    }

    if(window.location.href.includes("addProduct"))
    {
        loadCategories();
    }
}

function registerHereClicked() {
    document.getElementById("sign_in_div").style.display = "none";
    document.getElementById("sign_up_div").style.display = "block";
}

function signInHereClicked() {
    document.getElementById("sign_in_div").style.display = "block";
    document.getElementById("sign_up_div").style.display = "none";
}

function signUp() {
    let name = document.getElementById("name_input").value;
    let c_name = document.getElementById("company_name_input").value;
    let email = document.getElementById("sign_up_email_input").value;
    let password = document.getElementById("sign_up_password_input").value;
    let r_password = document.getElementById("retype_input").value;
    let no_prob = true;
    if (name == "") {
        document.getElementById("name_input").style.border = "1px solid red";
        no_prob = false;
    }
    if (c_name == "") {
        document.getElementById("company_name_input").style.border = "1px solid red";
        no_prob = false;
    }
    if (email == "") {
        document.getElementById("sign_up_email_input").style.border = "1px solid red";
        no_prob = false;
    }
    if (password == "") {
        document.getElementById("sign_up_password_input").style.border = "1px solid red";
        no_prob = false;
    }
    if (r_password == "") {
        document.getElementById("retype_input").style.border = "1px solid red";
        no_prob = false;
    }
    if (password != r_password) {
        document.getElementById("sign_up_password_input").style.border = "1px solid red";
        document.getElementById("retype_input").style.border = "1px solid red";
        no_prob = false;
    }
    if (no_prob) {
        sha512(password).then((hash) => sendToFirebase(email, hash, name, c_name));
    }
}

function sendToFirebase(email, password, name, company_name) {
    console.log(email, password);
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            // console.log(user);
            let data = {
                "name": name,
                "company_name": company_name,
                "email": email
            }
            firebase.database().ref().child("Sellers").child(user.uid).set(data).then(function onSuccess(res) {
                sessionStorage.setItem('uid', user.uid);
                window.location.replace("dashboard.html");
            }).catch(function onError(err) {
            });
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
}

function signInFirebase(email, password) {
    console.log("signInFirebase");
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            sessionStorage.setItem('uid', user.uid);
            window.location.replace("dashboard.html");
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
}

function signIn() {
    console.log("signIn");
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let no_prob = true;
    if (email == "") {
        document.getElementById("email").style.border = "1px solid red";
        no_prob = false;
    }
    if (password == "") {
        document.getElementById("password").style.border = "1px solid red";
        no_prob = false;
    }
    if (no_prob) {
        sha512(password).then((hash) => signInFirebase(email, hash));
    }
}

function signOut()
{
    sessionStorage.removeItem("uid");
    window.location.replace("index.html");
}

function loadCategories()
{
    let categories = document.getElementById("categories");
    let subCategories = document.getElementById("subCategories");
    categories.addEventListener("change", function()
    {
        subCategories.innerHTML = "";
        firebase.database().ref().child("Categories").child(categories.value).on('value', (s) => 
        {
            s.val().forEach((subCategory) => 
            {
                subCategories.innerHTML += `<option value="${subCategory}">${subCategory}</option>`;
            });
        });
    });
    firebase.database().ref().child("Categories").on('value', (snapshot) => {
        snapshot.forEach(function(childSnapshot) {
            categories.innerHTML += `<option value="${childSnapshot.key}">${childSnapshot.key}</option>`;
        });
        snapshot.val()[Object.keys(snapshot.val())[0]].forEach((subCategory) => 
        {
            subCategories.innerHTML += `<option value="${subCategory}">${subCategory}</option>`;
        });
    });      
}