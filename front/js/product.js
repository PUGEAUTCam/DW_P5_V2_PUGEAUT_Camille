// Je recupere grace a URLSearchParams la donnee ID qui va me servir a recuperer les donnees d'un seul canape via la requete get + ID de l'API.

let params = new URLSearchParams(window.location.search);
const id = params.get('id');

let urlAPIProduct = `http://localhost:3000/api/products/${id}`;


// Je recupere les donnees d'un canape pour la page produit et les insere dans la page grace a createElement, appendChild lorsqu'il faut creer une balise HTML, ou textContent lorsqu'il faut simplement ajouter du texte.


fetch(urlAPIProduct)
    .then(response => response.json())

    .then((dataProduct) => {

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

    }) .catch(() => document.querySelector('.item__img').textContent = 'Oups ! La page que vous cherchez ne semble pas disponible. Nos canapés reviennent bientôt.');
     

// Recuperation de la couleur et quantite selectionnees par l'utilisateur pour le local Storage

const addToCart = document.querySelector('#addToCart')

addToCart.addEventListener('click', () => {

    let idColors = document.querySelector('#colors');
    let colorsChoice = idColors.value;
    console.log(colorsChoice);

   let idQuantity = document.querySelector('#quantity');
   let quantity = idQuantity.value;
   console.log(quantity);

   console.log(id);

})








//Local Storage
// const product = {
//     id: id,
    
// }



// const productJson = JSON.parse(localStorage.getItem('product'));

// localStorage.setItem('product', '')
