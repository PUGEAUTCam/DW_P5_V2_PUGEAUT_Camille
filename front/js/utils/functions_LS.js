                                            // PAGE PRODUCT          
// Fonction confirmation = renvoi au panier// ou annuler les articles + renvoi a l'accueil
const confirm = () => {
    if (window.confirm(`Le produit a bien été ajouté à votre panier.`)) {
        window.location.href = './cart.html';
    }
    else {
        localStorage.removeItem('products');
        window.location.href = './index.html';
    }
}

/**
 * [saveBasket Set products in LS]
 *
 * @param   {Array <object>}   storageProducts  products in LS
 *
 * @returns  {Key: string & Array <object>}   Set storageProducts en format JSON dans le LS en paire cle/valeur
 */

const saveBasket = (storageProducts) => {
    localStorage.setItem('products', JSON.stringify(storageProducts)); 
}
/**
 * [getBasket Get products from LS]
 *
 * @return  {Array <object> | Array}   !products : cree un [] vide
 *                 products : retourne un tableau d'objets
 */
const getBasket = () => {
    let storageProducts = localStorage.getItem('products');
    console.log(storageProducts);

    if (storageProducts === null) {
        return storageProducts = []; 
    } else
        return JSON.parse(storageProducts) //JSON. parse() transforme une chaîne JSON en un objet JavaScript. 
}

/**
 * [addBasket To add products in LS]
 *
 * @param   {object}  product  caracteristiques que l'on stocke dans le LS, ici ID, color, quantity
 *
 * @return  {Array <object>}           Incrementation si produit existant / push si produit inexistant dans le LS
 */

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

/**
 * [Fusionne les donnees de mes produits venant du LS et de l'API pour affichage complet sur la page panier]
 *
 * @param   {Array <object>}  products  products from API
 *
 * @return  {Array <object>}  productsInBasket      Un tableau d'objet fusionnant les infos de l'API et celles recup dans le LS
 */

 const completeProduct = (products) => {

    const productsInBasket = JSON.parse(localStorage.getItem('products'));

    for (let index = 0; index < productsInBasket?.length; index++) {
        for (let index2 = 0; index2 < products.length; index2++) {

            if(productsInBasket[index].id === products[index2]._id){

                productsInBasket[index] = {
                    //Spread Operator
                    ...productsInBasket[index],
                    ...products[index2],
                }
            }    
        }   
    }

    return productsInBasket
};








