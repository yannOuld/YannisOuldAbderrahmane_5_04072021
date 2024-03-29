
// ------------ varirables 
import * as cartStorage from './cartStorage.js';
const API_Url = 'http://localhost:3000/api/cameras/order';
const table = document.querySelector('.table');
const form = document.getElementById('form');
const username = document.getElementById('user-name');
const firstname = document.getElementById('user-firstname');
const adress = document.getElementById('user-adress');
const city = document.getElementById('user-city');
const email = document.getElementById('email');
const submit_btn = document.getElementById('submit-btn');
const items = JSON.parse(localStorage.getItem('item'));

// ------------ verifications des inputs
function checkinput() {
    const firstnameValue = firstname.value.trim();
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const adressValue = adress.value.trim();
    const cityValue = city.value.trim();

    // verifier chaque valeur des input
    if (usernameValue === '') {

    } else {
        setSuccesFor(username)
    }
    if (firstnameValue === '') {

    }
    else {
        setSuccesFor(firstname)
    }
    if (adressValue === '') {

    } else {
        setSuccesFor(adress)
    }
    if (cityValue === '') {

    }
    else {
        setSuccesFor(city)
    }
    if (emailValue === '') {

    } else {
        setSuccesFor(email);
    }
};

// ------------ fonction qui envoie un message de confirmation de l'input 
function setSuccesFor(input) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    // ajouter un message 
    small.textContent = 'ok ! ';
    // ajouter une classe au message d'erreur 
    small.className = 'text-success'
}

// ------------ evenement du bouton submit du formulaire 
function formBtn() {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        checkinput();
        const items = cartStorage.getItem();
        if (localStorage.getItem('item')) {
            passOrder66();
        } else {
            window.alert("Votre panier est vide !")
        }
    });
}

// ------------ Envoyer le formulaire à l'api et enregistrement dans le localStorage
function passOrder66() {
    const items = cartStorage.getItem();
    //mise en forme des données pour quelles soit accepter par le serveur 
    let contact = {
        firstName: firstname.value.trim(),
        lastName: username.value.trim(),
        address: adress.value.trim(),
        city: city.value.trim(),
        email: email.value.trim()
    };

    const products = [];
    items.forEach(item => {
        products.push(item._id)
    });

    //envoie des données formulaire au serveur avec la methode POST
    let order = { products, contact };
    const postRequest = fetch(API_Url, {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json ; charset=utf-8'
        },
    })

    postRequest.then(async (response) => {
        try {
            const requestOrder = await response.json();
            localStorage.setItem('commande', JSON.stringify(requestOrder));
            if (localStorage.getItem('commande')) {
                document.location.href = "./commande.html"
            }

        } catch (e) {
            console.log(e);
        }
    })
}

document.addEventListener("DOMContentLoaded", formBtn);