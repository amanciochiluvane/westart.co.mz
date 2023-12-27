
import imageUrlBuilder from 'https://cdn.skypack.dev/@sanity/image-url';

const builder = imageUrlBuilder({
    projectId: 'bi327w6t',
    dataset: 'production',
    apiVersion: '2021-10-21',
    useCdn: true,
});



const urlParams = new URLSearchParams(window.location.search);
 let pageId = urlParams.get('id');


if(pageId){
                      
let PROJECT_ID = "bi327w6t";
let DATASET = "production";
let QUERY = encodeURIComponent(`*[_type == "destaque" && (titulo match "${pageId}" || descricao match "${pageId}" || category match "${pageId}")]`);

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
            const recentItems = result;
            const newsContainers = document.getElementById('conteudo');
          

            recentItems.forEach((item) => {
                const titulo = item.titulo;
                const descricao = item.descricao;
                const imagemUrl = builder.image(item?.imagem?.asset?._ref);
                const dt = new Date(item.data).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                const aut = item.autor;
                const categoria=item.category;

                // Criação de elementos HTML dinâmicos
                const newsCard = document.createElement("article");
                newsCard.classList.add('post-2098', 'post' ,'type-post' ,'status-publish', 'format-standard', 'has-post-thumbnail' ,'category-lifestyle' ,'cs-entry')

                newsCard.innerHTML = `
                
                    <div class="cs-entry__outer">
                        <div class="cs-entry__inner cs-entry__thumbnail cs-entry__overlay cs-overlay-ratio cs-ratio-landscape" data-scheme="inverse">
                            <div class="cs-overlay-background">
                                <img width="512" height="384" src="${imagemUrl}" class="attachment-csco-thumbnail size-csco-thumbnail wp-post-image" alt="${titulo}" decoding="async" loading="lazy" />
                            </div>
                            <a class="cs-overlay-link" href="noticia.html?id=${item._id}" title="${titulo}"></a>
                        </div>
                        <div class="cs-entry__inner cs-entry__content">
                            <div class="cs-entry__post-meta">
                                <div class="cs-meta-author">
                                    <span class="cs-meta-author-by">By</span>
                                    <a class="cs-meta-author-link url fn n" href="#">
                                        <span class="cs-meta-author-name">${aut}</span>
                                    </a>
                                </div>
                                <div class="cs-meta-date">${dt}</div>
                            </div>
                            <h2 class="cs-entry__title">
                                <a href="noticia.html?id=${item._id}">
                                    <span>${titulo}</span>
                                </a>
                            </h2>
                            <div class="cs-entry__post-meta">
                                <div class="cs-meta-category">
                                    <ul class="post-categories">
                                        <li><a href="#" rel="category tag">${categoria}</a></li>
                                    </ul>
                                </div> 
                            </div>
                        </div>
                    </div>
                `;

                // Loop through each news container and append the news card
                newsContainers.appendChild(newsCard);                       
            });
        }
    
        else{

          const newsContainers = document.getElementsByClassName('cs-posts-area__main cs-archive-grid  cs-posts-area__archive cs-posts-area__grid');

          const noResultsMessage = document.createElement("p");
  noResultsMessage.textContent = "Nenhum resultado encontrado.";
  

  Array.from(newsContainers).forEach(container => {
                    container.appendChild(noResultsMessage.cloneNode(true));
                });
    }
    
      }
    
    )
  }
    