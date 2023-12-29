
import imageUrlBuilder from 'https://cdn.skypack.dev/@sanity/image-url';

const builder = imageUrlBuilder({
    projectId: 'bi327w6t',
    dataset: 'production',
    apiVersion: '2021-10-21',
    useCdn: true,
});

let PROJECT_ID = "bi327w6t";
let DATASET = "production";
let QUERY = encodeURIComponent('*[_type == "destaque" && category=="Marketing"]');

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
            const recentItems = result.slice(0,4);
            const newsContainers = document.getElementsByClassName('div252');
            

            recentItems.forEach((item) => {
                const titulo = item.titulo;
                const descricao = item.descricao;
                 const imagemUrl = builder.image(item?.imagem?.asset?._ref);
            
                const tituloConverted = titulo.replace(/\s+/g, '-');
            
               


            
             
              
                

                // Criação de elementos HTML dinâmicos
                const newsCard = document.createElement
                ("article");
                newsCard.classList.add('post-2098', 'post' ,'type-post' ,'status-publish', 'format-standard', 'has-post-thumbnail' ,'category-lifestyle' ,'cs-entry')

                newsCard.innerHTML = `
                
                    <div class="cs-entry__outer" >
                        <div class="cs-entry__inner cs-entry__thumbnail cs-entry__overlay cs-overlay-ratio cs-ratio-landscape" data-scheme="inverse">
                            <div class="cs-overlay-background">
                                <img width="512" height="384" src="${imagemUrl}" style="border:none"class="attachment-csco-thumbnail size-csco-thumbnail wp-post-image"  alt="${titulo}" decoding="async" loading="lazy" />
                            </div>
                            <a class="cs-overlay-link"  href="/noticia/?id=${tituloConverted}" title="${titulo}"></a>
                        </div>
                        <div class="cs-entry__inner cs-entry__content">
                            <div class="cs-entry__post-meta">
                                
                                <div class="cs-meta-date"></div>
                            </div>
                            <h2 class="cs-entry__title" id="cstitle" >
                                <a href="/noticia/?id=${tituloConverted}">
                                    <span>${titulo}</span>
                                </a>
                            </h2>
                            <p class="cs-entry__subtitle " style="font-size:16px;     margin-top: 5px;
" id="subt"> ${descricao}</p>

                           
                        </div>
                    </div>
                `;

                

                // Loop through each news container and append the news card
                Array.from(newsContainers).forEach(container => {
                    container.appendChild(newsCard.cloneNode(true));
                });
            });
        }
    })