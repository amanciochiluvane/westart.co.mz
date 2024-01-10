
import imageUrlBuilder from 'https://cdn.skypack.dev/@sanity/image-url';
                            
const builder = imageUrlBuilder({
    projectId: 'bi327w6t',
    dataset: 'production',
    apiVersion: '2021-10-21',
    useCdn: true,
});

let PROJECT_ID = "bi327w6t";
let DATASET = "production";
let QUERY = encodeURIComponent('*[_type == "destaque" ]');

let PROJECT_URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

// fetch the content
fetch(PROJECT_URL)
    .then((res) => res.json())
    .then(({ result }) => {
        // Verifica se há pelo menos um resultado
        if (result.length > 0) {
            // Sort the results in descending order based on the 'data' property (most recent first)
            result.sort((a, b) => new Date(b.data) - new Date(a.data));

            // Extrai as informações do primeiro item (o mais recente)
            const recentItems = result.slice(15,19);
            const newsContainers = document.getElementsByClassName('wp-block-latest-posts__list has-dates has-author is-style-cs-horizontal-layout wp-block-latest-posts');
            

            recentItems.forEach((item) => {
                const titulo = item.titulo;
               
                const imagemUrl = builder.image(item?.banimg?.asset?._ref);
                
                const dtt = new Date(item.data).toLocaleDateString('pt-PT', { year: 'numeric', month: 'long', day: 'numeric' });
                const parts = dtt.split(' ');

                // Verificar se a parte correspondente ao mês existe e não está vazia
                if (parts.length >= 3 && parts[2]) {
                    // Substituir a primeira letra do mês pela versão maiúscula
                    parts[2] = parts[2].charAt(0).toUpperCase() + parts[2].slice(1);
                }
                
                // Juntar as partes de volta em uma string
                const dt = parts.join(' ');
                
                const tituloConverted = titulo.replace(/\s+/g, '--');

                

                // Criação de elementos HTML dinâmicos
                const newsCard = document.createElement("li");
                

                newsCard.innerHTML = `
                
                <div class="wp-block-latest-posts__featured-image alignleft">
                
                    <a href="/noticia/?id=${tituloConverted}" style="width:70px; height:70px">
                        <img loading="lazy" decoding="async" width="150" height="150" src="${imagemUrl}" 
                style="height:100%"  /></a>
               
        </div> 
        <time  id="datal">${dt}</time>
        <a class="wp-block-latest-posts__post-title" id="titul" style="font-size:17px;" href="/noticia/?id=${tituloConverted}" >${titulo}</a>
        

       
                `;

                // Loop through each news container and append the news card
                Array.from(newsContainers).forEach(container => {
                    container.appendChild(newsCard.cloneNode(true));
                });
            });
        }
    })