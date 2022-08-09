
                                            //PAGE PRODUCT          
// Fonction confirmation = renvoi au panier// ou annuler les articles + renvoi a l'accueil
// const confirm = () => {
//     if (window.confirm(`Le produit a bien été ajouté à votre panier.`)) {
//         window.location.href = './cart.html';
//     }
//     else {
//         localStorage.removeItem('products');
//         window.location.href = './script.html';
//     }
// }


//@Set le produit dans LS au format linearisé
const saveBasket = (storageProducts) => {
    localStorage.setItem('products', JSON.stringify(storageProducts));
}

//Fonction qui recupere les donnés dans LS + conversion en objet avec JSON.Parse()  OU creer un panier vide [] si aucun produit
const getBasket = () => {
    let storageProducts = localStorage.getItem('products');

    if (storageProducts === null) {
        return storageProducts = [];
    } else
        return JSON.parse(storageProducts)
}

//Fonction qui ajoute au panier les produits selectionnés
const addBasket = (product) => {
    let storageProducts = getBasket();

    //Condition pour verifier si 2 produits ont le meme id et la meme couleur, si oui on incremente simplement la ligne du panier
    let existProduct = storageProducts.find(c => c.id === product.id && c.color === product.color)

    if (existProduct != undefined) {
        existProduct.quantity = existProduct.quantity + product.quantity; 
    } else {
        storageProducts.push(product);
    }
    saveBasket(storageProducts);
};



                                            //PAGE PANIER CART
 
//Fonction pour obtenir le produit completé, je fusionne avec spread chaque objet du tableau en fonction de l'ID
 const completeProduct = (products) => {

    const productsInBasket = JSON.parse(localStorage.getItem('products'));

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
};








