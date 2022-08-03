// Je recupere grace a URLSearchParams la donnee ID qui va me servir a recuperer les donnees d'un seul canape via la requete get + ID.

let params = new URLSearchParams(window.location.search);
const id = params.get('id');

let urlAPIProduct = `http://localhost:3000/api/products/${id}`;

// Je recupere les donnees d'un canape pour la page produit et les insere dans la page grace a createElement, appendChild lorsqu'il faut creer une balise HTML, ou textContent lorsqu'il faut simplement ajouter du texte.

fetch(urlAPIProduct) //Get One product
    .then(response => response.json())

    .then(dataProduct => {

        let imgKanap = document.createElement('img');
        imgKanap.src = dataProduct.imageUrl;
        imgKanap.alt = dataProduct.altTxt;
        document.querySelector('.item__img').appendChild(imgKanap);

        let titleKanap = dataProduct.name;
        document.querySelector('#title').textContent = titleKanap;

        let priceKanap = dataProduct.price;
        document.querySelector('#price').textContent = priceKanap;

        let descriptionKanap = dataProduct.description;
        document.querySelector('#description').textContent = descriptionKanap;


        let colorsKanap = dataProduct.colors;
        for (let color of colorsKanap) {
            let colorKanap = document.createElement('option');
            colorKanap.value = color;
            colorKanap.textContent = color;
            document.querySelector('#colors').appendChild(colorKanap);
        }

    }).catch(() => document.querySelector('.item__img').textContent = 'Oups ! La page que vous cherchez ne semble pas disponible. Nos canapés reviennent bientôt.');



//Selection du bouton "ajouter au panier" et ajout d'un evenement au clic qui declenche mes fonctions
const idAddToCart = document.querySelector('#addToCart')


idAddToCart.addEventListener('click', () => {

    // Variables et objet final qui correspondent aux donnees que je veux stocker dans le LS
    let idColors = document.querySelector('#colors');
    let colorsChoice = idColors.value;

    let idQuantity = document.querySelector('#quantity');
    let quantity = idQuantity.value;

    let finalProduct = {
        id: id,
        color: colorsChoice,
        quantity: quantity,
    }

    //Je verifie que le client indique la couleur et la qté, si oui j'applique la fonction addBasket en passant en parametre mon finalProduct pour stocker mes 3 donnees dans le LS

    if (colorsChoice === '') {
        alert('Veuillez sélectionner une couleur pour votre canapé');
    } else if (quantity == 0) {
        alert('Veuillez renseigner une quantité');
    } else {
        addBasket(finalProduct);
        confirm();
    }

});





