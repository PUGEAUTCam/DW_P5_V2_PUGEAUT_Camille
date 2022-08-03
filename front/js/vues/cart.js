const cart = async () => {

    //Recuperation du tableau d'objets enregistres dans le Local Storage 
    const productsInBasket = JSON.parse(localStorage.getItem('products'));

    // Get all products pour recuperer les donnees qui me manquent dans le LS
    let urlAPI = 'http://localhost:3000/api/products/';

    const products = await fetch(urlAPI)//Get all products
        .then(response => response.json())
        .catch(() => document.querySelector('#cart__items').textContent = 'Oups ! La page que vous cherchez ne semble pas disponible. Nos canapés reviennent bientôt.');
        
        
    //J'apelle ma fonction pour 
    let completeProductInBasket = completeProduct(productsInBasket, products);

    console.log(completeProductInBasket);

    

}

cart();