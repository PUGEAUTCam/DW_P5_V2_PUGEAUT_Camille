
//PAGE PRODUIT PRODUCT
// Fonction pour confirmation = renvoi au panier// ou annuler l'article + renvoi a l'accueil
const confirm = () => {
    if (window.confirm(`Le produit a bien été ajouté à votre panier.`)) {
        window.location.href = './cart.html';
    }
    else {
        localStorage.removeItem('products');
    }
}


//@Set le produit dans LS au format linearise
const saveBasket = (storageProducts) => {
    localStorage.setItem('products', JSON.stringify(storageProducts));
}

//Recupere s'il y a un produit dans LS au format objet OU creer un panier vide []
const getBasket = () => {
    let storageProducts = localStorage.getItem('products');

    if (storageProducts === null) {
        return storageProducts = [];
    } else
        return JSON.parse(storageProducts)
}

//On met dans le panier 
const addBasket = (product) => {
    let storageProducts = getBasket();

    //Condition pour verifier si 2 produits ont le meme id et la meme couleur, si oui on incremente simplement la ligne du panier
    let existProduct = storageProducts.find(c => c.id === product.id && c.color === product.color)
    if (existProduct != undefined) {
        existProduct.quantity++;
    } else {
        product.quantity = 1;
        storageProducts.push(product);
    }

    saveBasket(storageProducts);
};

//PAGE PANIER CART
 //Fonction pour obtenir le produit completé, je fusionne avec spread chaque objet du tableau en fonction de l'ID
 const completeProduct = (productsInBasket, products) => {

    for (let index = 0; index < productsInBasket.length; index++) {
        
        for (let index2 = 0; index2 < products.length; index2++) {

            
            if(productsInBasket[index].id === products[index2]._id){

                productsInBasket[index] = {
                    ...productsInBasket[index],
                    ...products[index2],
                }
            }    
        }   
    }
    return productsInBasket
}



