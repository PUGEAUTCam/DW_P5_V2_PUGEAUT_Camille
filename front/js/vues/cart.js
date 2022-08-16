const cart = async () => {
    //Recuperation du tableau d'objets enregistres dans le Local Storage 
    const productsInBasket = JSON.parse(localStorage.getItem('products'));

    if (productsInBasket === null || productsInBasket.length === 0) {
        document.querySelector('.basket').textContent = 'Votre panier est vide';
    }

    //Get all products pour recuperer les donnees qui me manquent dans le LS
    let urlAPI = 'http://localhost:3000/api/products/';
    const fetchProducts = await fetch(urlAPI)
        .then(response => response.json())
        .catch(() => document.querySelector('#cart__items').textContent = 'Oups ! La page que vous cherchez ne semble pas disponible. Nos canapés reviennent bientôt.');

    //Fonction pour implementation dans DOM des donnees recuperees de l'API et LS, grace a la fonction completeProduct
    const cardKanap = () => {

        let completeProductInBasket = completeProduct(fetchProducts);

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
                let completeProductInBasket = completeProduct(fetchProducts);
                const id = cartItems[index].dataset.id;
                const color = cartItems[index].dataset.color;
                const indexInBasket = completeProductInBasket.findIndex(item => item.id === id && item.color === color)

                completeProductInBasket[indexInBasket].quantity = (Number(input.value)); // La qté de l'input devient celle du LS
                saveBasket(completeProductInBasket); // On sauvegarde le LS
                input.previousElementSibling.innerHTML = `Qté : ` + completeProductInBasket[index].quantity; // On affiche dans le DOM notre nouvelle qté

                displayTotal();
            });

        });
    };
    changeQuantityFromBasket();

    // Fonction pour supprimer le panier du DOM et LS
    const removeProductFromBasket = () => {

        let buttonDelete = document.querySelectorAll('.deleteItem');

        buttonDelete.forEach((button, index) => {
            button.addEventListener('click', () => {
                let completeProductInBasket = completeProduct(fetchProducts);
                const id = cartItems[index].dataset.id;
                const color = cartItems[index].dataset.color;
                const indexInBasket = completeProductInBasket.findIndex(item => item.id === id && item.color === color)

                let product = completeProductInBasket.filter(p => p.id != completeProductInBasket[index].id || p.color != completeProductInBasket[index].color);

                saveBasket(product);
                cardKanap();
                window.location.reload();
                displayTotal();
            });
        });
    };
    removeProductFromBasket();

    //Fonction pour afficher la qté et prix total 
    const displayTotal = () => {

        let completeProductInBasket = completeProduct(fetchProducts);

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




    // Verification du formualaire : Creation des RegExp
    let orderButton = document.querySelector('#order');
    let form = document.querySelector('.cart__order__form');
    let generalRegEx = /^[a-zA-Zà-żÀ-Ż-\s+-]+$/;
    let addressRegEx = /^[a-zA-Z0-9\u00C0-\u00FF\s,. '-]{3,}$/;
    let emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    orderButton.addEventListener('click', (e) => {

        e.preventDefault();
        //Creation de l'objet contact pour la requete POST 
        let contact = {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            address: form.address.value,
            city: form.city.value,
            email: form.email.value,
        }

        //Une fonction pour chaque verification par Regex
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


        //Si tous les elements du formulaire sont true et que le LS n'est pas null, alors requete POST au backend pour recuperer ensuite le numero de commande
        if (
            validFistName() === true &&
            validLastName() === true &&
            validAddress() === true &&
            validCity() === true &&
            validEmail() === true
        ) {
            let completeProductInBasket = completeProduct(fetchProducts);
            if (completeProductInBasket == null || completeProductInBasket.length === 0) {
                alert(`Votre panier est vide ! Veuillez selectionner vos futurs canapés`)
            } else {
                //Fonction POST pour envoyer l'objet 'contact' et le tableau 'products' d'ID au back, pour recevoir en retour le numero de commande
                const fetchProductsPost = async () => {

                    let products = completeProductInBasket.map(item => item.id); //Tableau products d'ID

                    const orderProducts = await fetch(`http://localhost:3000/api/products/order`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ contact, products }),
                    }).then(response => response.json()) 
                    .catch(() => document.querySelector('#cart__items').textContent = 'Oups ! La page que vous cherchez ne semble pas disponible. Nos canapés reviennent bientôt.');

                    //Je recupere orderId depuis fetch puis l'integre a l'URL pour pouvoir l'afficher sur la page confirmation
                    let orderId = orderProducts.orderId;
                    window.location.replace(`./confirmation.html?orderId=${orderId}`);
                };
                fetchProductsPost();
            };
        };
    });
}

cart();