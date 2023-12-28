
import imageUrlBuilder from 'https://cdn.skypack.dev/@sanity/image-url';

const builder = imageUrlBuilder({
    projectId: 'bi327w6t',
    dataset: 'production',
    apiVersion: '2021-10-21',
    useCdn: true,
});

const PROJECT_ID = "bi327w6t";
const DATASET = "production";
const urlParams = new URLSearchParams(window.location.search);
const noticiaId = urlParams.get('id');


const noticiaIdOriginal = noticiaId.replace(/-/g, ' ');

let QUERY = encodeURIComponent(`*[_type == "destaque" && titulo == "${noticiaIdOriginal}"]`);

let PROJECT_URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;
// Fetch the current news content
fetch(PROJECT_URL)
    .then((res) => res.json())
    .then(({ result }) => {
        const item = result[0];
        const categoriaAtual=item.category;
       

        // Build a new query to fetch related articles with the same category
        const consultaRelacionada = encodeURIComponent(`*[_type == "destaque" && category == "${categoriaAtual}"]`);

        // Fetch related articles
        buscarArtigosRelacionados(consultaRelacionada);
    })
    .catch((err) => console.error(err));

    function buscarArtigosRelacionados(consultaRelacionada) {
const urlRelacionada = `https://bi327w6t.api.sanity.io/v2021-10-21/data/query/production?query=${consultaRelacionada}`;

// Fetch related articles
fetch(urlRelacionada)
    .then((res) => res.json())
    .then(({ result }) => {
        // Sort the results in descending order based on the 'data' property (most recent first)
        result.sort((a, b) => new Date(b.data) - new Date(a.data));

        // Extract information from related items
        const newsContainers = document.getElementsByClassName('cs-posts-area__read-next cs-read-next__grid');

        // Get the current news article ID from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const currentNewsId = urlParams.get('id');
        const currentNewsId2  = currentNewsId.replace(/-/g, ' ');
        console.log(currentNewsId2);
        result.forEach((item) => {
            // Check if the article ID is different from the current news article ID
            if (item.titulo !== currentNewsId2) {
                const titulo = item.titulo;
                 const imagemUrl = builder.image(item?.imagem?.asset?._ref);
                 const tituloConverted = titulo.replace(/\s+/g, '-');
       

                const categoria = item.category;

                // Create HTML elements dynamically
                const newsCard = document.createElement("article");
                newsCard.classList.add('post-2098', 'post', 'type-post', 'status-publish', 'format-standard', 'has-post-thumbnail', 'category-lifestyle', 'cs-entry');

                newsCard.innerHTML = `
                    <div class="cs-entry__outer">
                        <div class="cs-entry__inner cs-entry__thumbnail cs-entry__overlay cs-overlay-ratio cs-ratio-landscape" data-scheme="inverse">
                            <div class="cs-overlay-background">
                                <img width="512" height="384" src="${imagemUrl}" class="attachment-csco-thumbnail size-csco-thumbnail wp-post-image" alt="${titulo}" decoding="async" loading="lazy" />
                            </div>
                            <a class="cs-overlay-link" href="noticia.html?id=${tituloConverted}" title="${titulo}"></a>
                        </div>
                        <div class="cs-entry__inner cs-entry__content">
                            <h2 class="cs-entry__title">
                                <a href="noticia.html?id=${tituloConverted}">
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
                Array.from(newsContainers).forEach(container => {
                    container.appendChild(newsCard.cloneNode(true));
                });
            }
        });
    })
    .catch((err) => console.error(err));
}

