// Je recupere l'orderId que j'ai stocké dans l'URL
let params = new URLSearchParams(window.location.search);
const orderId = params.get('orderId');

// Je l'affiche dans le DOM
document.querySelector('#orderId').textContent = orderId;

//Je supprime le panier une fois que la commande est validee 
localStorage.removeItem('products');




