const cart = async () => {
    //Recuperation du tableau d'objets enregistres dans le Local Storage 
    const productsInBasket = JSON.parse(localStorage.getItem('products'));

    if (productsInBasket === null) {
        document.querySelector('.basket').textContent = 'Votre panier est vide';
    }

    //Get all products pour recuperer les donnees qui me manquent dans le LS
    let urlAPI = 'http://localhost:3000/api/products/';
    const products = await fetch(urlAPI)
        .then(response => response.json())
        .catch(() => document.querySelector('#cart__items').textContent = 'Oups ! La page que vous cherchez ne semble pas disponible. Nos canapés reviennent bientôt.');

    //Fonctin pour implementation des donnees recuperees dans le HTMl
    const cardKanap = () => {

        let completeProductInBasket = completeProduct(products);

        let content = ``;

        for (let index = 0; index < completeProductInBasket.length; index++) {

            const kanap = completeProductInBasket[index];

            let kanapId = kanap.id;
            let kanapColor = kanap.color;
            let kanapImg = kanap.imageUrl;
            let kanapImgAlt = kanap.altTxt;
            let kanapName = kanap.name;
            let kanapPrice = kanap.price;
            let kanapQuantity = kanap.quantity;

            content += `<article class="cart__item" data-id="${kanapId}" data-color="${kanapColor}">
                            <div class="cart__item__img">
                                <img src="${kanapImg}" alt="${kanapImgAlt}">
                            </div>
                            <div class="cart__item__content">
                                <div class="cart__item__content__description">
                                    <h2>${kanapName}</h2>
                                    <p>${kanapColor}</p>
                                    <p>${kanapPrice} €</p>
                                </div>
                                <div class="cart__item__content__settings">
                                    <div class="cart__item__content__settings__quantity">
                                        <p id= "product-quantity-${kanapId} qt">Qté : ${kanapQuantity}</p>
                                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100"
                                            value="${kanapQuantity}">
                                    </div>
                                    <div class="cart__item__content__settings__delete">
                                        <p class="deleteItem">Supprimer</p>
                                    </div>
                                </div>
                            </div>
                        </article> `
        }
        document.querySelector('#cart__items').innerHTML = content;
    };
    cardKanap();

    const cartItems = document.querySelectorAll('.cart__item');

    //Fonction pour changer la quantite 
    const changeQuantityFromBasket = () => {

        const inputsQuantity = document.querySelectorAll('.itemQuantity');

        inputsQuantity.forEach((input, index) => { //Boucle sur chaque input, j'ajoute une ecoute lors du changement de celui-ci
            input.addEventListener('change', () => {
                let completeProductInBasket = completeProduct(products);
                const id = cartItems[index].dataset.id;
                const color = cartItems[index].dataset.color;

                const indexInBasket = completeProductInBasket.findIndex(item => item.id === id && item.color === color)


                completeProductInBasket[indexInBasket].quantity = (Number(input.value));
                saveBasket(completeProductInBasket);
                input.previousElementSibling.innerHTML = `Qté : ` + completeProductInBasket[index].quantity;

                displayTotal();
            });

        });
    };
    changeQuantityFromBasket();

    // Fonction pour supprimer le panier du DOM et LS


    // const removeProductFromBasket = () => {

    //     let buttonDelete = document.querySelectorAll('.deleteItem');

    //     buttonDelete.forEach(button => {
    //         button.addEventListener('click', () => {


    //             let completeProductInBasket = completeProduct(products);
    //             for (let index = 0; index < completeProductInBasket.length; index++) {

    //                 if (completeProductInBasket[index].id === cartItems[index].dataset.id && completeProductInBasket[index].color === cartItems[index].dataset.color) {
    //                     let product = completeProductInBasket.filter(p => p.id != completeProductInBasket[index].id || p.color != completeProductInBasket[index].color);
    //                     saveBasket(product);
    //                 }
    //             }
    //             cardKanap();
    //             displayTotal();
    //         });
    //     });
    // };
    // removeProductFromBasket();

    //Fonction pour afficher 
    const displayTotal = () => {

        let completeProductInBasket = completeProduct(products);

        let totalValue = {
            price: 0,
            quantity: 0,
        }
        for (let index = 0; index < completeProductInBasket.length; index++) {

            totalValue.quantity += completeProductInBasket[index].quantity;
            totalValue.price += completeProductInBasket[index].price * completeProductInBasket[index].quantity;
        }
        document.querySelector('#totalQuantity').textContent = totalValue.quantity;
        document.querySelector('#totalPrice').textContent = totalValue.price;

    }
    displayTotal();

    // Verification du formualaire Creation des RegExp
    let orderButton = document.querySelector('#order');
    let form = document.querySelector('.cart__order__form');
    let generalRegEx = /^[a-zA-Zà-żÀ-Ż-\s+-]+$/;
    let addressRegEx = /^[a-zA-Z0-9\u00C0-\u00FF\s,. '-]{3,}$/;
    let emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    orderButton.addEventListener('click', (e) => {

        e.preventDefault();

        let contact = {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            address: form.address.value,
            city: form.city.value,
            email: form.email.value,
        }

        const validFistName = () => {
            let isValid = generalRegEx.test(contact.firstName);
            form.firstName.nextElementSibling.innerHTML = isValid ? '' : 'Veuillez entrer un prénom valide';
            return isValid
        }

        const validLastName = () => {
            let isValid = generalRegEx.test(contact.lastName);
            form.lastName.nextElementSibling.innerHTML = isValid ? '' : 'Veuillez entrer un nom valide';
            return isValid
        };

        const validAddress = () => {
            let isValid = addressRegEx.test(contact.address);
            form.address.nextElementSibling.innerHTML = isValid ? '' : `Veuillez entrer une adresse valide`;
            return isValid
        };

        const validCity = () => {
            let isValid = generalRegEx.test(contact.city)
            form.city.nextElementSibling.innerHTML = isValid ? '' : `Veuillez entrer une ville valide`;
            return isValid
        };

        const validEmail = () => {
            let isValid = emailRegEx.test(contact.email);
            form.email.nextElementSibling.innerHTML = isValid ? "" : 'Veuillez entrer un mail valide';
            return isValid
        };

        if (
            validFistName() === true &&
            validLastName() === true &&
            validAddress() === true &&
            validCity() === true &&
            validEmail() === true
        ) {
            // let completeProductInBasket = completeProduct(products);
            // console.log(completeProductInBasket);

            // alert('Votre commande et le formulaire sont validés !');
            // window.location.href = './confirmation.html'
        }
    });

    let data = completeProductInBasket.map(item => item.id)



    // http://localhost:3000/api/products/order


    /**
    *
    * Expects request to contain:
    * contact: {
    *   firstName: string,
    *   lastName: string,
    *   address: string,
    *   city: string,
    *   email: string
    * }
    * products: [string] <-- array of product _id
    *
    */
















}

cart();