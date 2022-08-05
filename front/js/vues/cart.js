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


    //Apelle de la fonction complete product pour creer un tableau a partir des donnees API et du LS
    let completeProductInBasket = completeProduct(productsInBasket, products);

    //Fonctin pour implementation des donnees recuperees dans le HTMl
    const cardKanap = () => {
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
                                        <p>Qté : ${kanapQuantity}</p>
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


    const inputQuantity = document.querySelectorAll('.itemQuantity'); //Selection du ou des input QTE
    const cartItem = document.querySelectorAll('.cart__item');

    //Fonction pour changer la quantite 
    const changeQuantityFromBasket = () => {

        inputQuantity.forEach(input => { //Boucle sur chaque input, j'ajoute une ecoute lors du changement de celui-ci

            input.addEventListener('change', () => {

                for (let index = 0; index < completeProductInBasket.length; index++) {

                    if (completeProductInBasket[index].id === cartItem[index].dataset.id && completeProductInBasket[index].color === cartItem[index].dataset.color) {

                        completeProductInBasket[index].quantity = (Number(inputQuantity[index].value));
                        saveBasket(completeProductInBasket);

                    }
                };
            });
        });

    };
    changeQuantityFromBasket();


    // Fonction pour supprimer le panier du DOM et LS

    let buttonDelete = document.querySelectorAll('.deleteItem');

    const removeProductFromBasket = () => {

        buttonDelete.forEach(button => {

            button.addEventListener('click', () => {

                for (let index = 0; index < completeProductInBasket.length; index++) {

                    if (completeProductInBasket[index].id === cartItem[index].dataset.id && completeProductInBasket[index].color === cartItem[index].dataset.color){

                        let product = completeProductInBasket.filter(p => p.id != completeProductInBasket[index].id || p.color != completeProductInBasket[index].color);
                        saveBasket(product);
                        location.reload();
                    }
                }
            });
        });
    };
    removeProductFromBasket();



































}

cart();