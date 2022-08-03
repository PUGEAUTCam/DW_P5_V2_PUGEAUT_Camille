const script = async () => {
    
    let urlAPI = 'http://localhost:3000/api/products/';

    const data = await fetch(urlAPI)//Get all products
    .then(response => response.json())
    .catch(() => document.querySelector('#items').textContent = 'Oups ! La page que vous cherchez ne semble pas disponible. Nos canapés reviennent bientôt.');

    let content = ``;

    for (let i = 0; i <data.length; i++) {

        let idKanap = data[i]._id;
        let imgKanap = data[i].imageUrl;
        let imgAltKanap = data[i].altTxt;
        let nameKanap = data[i].name;
        let descriptionKanap = data[i].description;            

        content += ` 
                <a href="./product.html?id=${idKanap}">
                    <article>
                        <img src="${imgKanap}" alt="${imgAltKanap}">
                        <h3 class="productName">${nameKanap}</h3>
                        <p class="productDescription">${descriptionKanap}</p>
                    </article>
                </a>
                `
    } 

    document.querySelector('#items').innerHTML = content;

}

script();










