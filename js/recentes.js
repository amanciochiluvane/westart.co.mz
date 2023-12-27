
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
                                            const recentItems = result.slice(3,7);
                                            const newsContainers = document.getElementsByClassName('wp-block-latest-posts__list has-dates has-author is-style-cs-horizontal-layout wp-block-latest-posts');
                                            
                            
                                            recentItems.forEach((item) => {
                                                const titulo = item.titulo;
                                                const descricao = item.descricao;
                                                const imagemUrl = builder.image(item?.imagem?.asset?._ref);
                                                const dt = new Date(item.data).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                                                const aut = item.autor;
                                                const categoria=item.category;
                            
                                                // Criação de elementos HTML dinâmicos
                                                const newsCard = document.createElement("li");
                                                
                            
                                                newsCard.innerHTML = `
                                                
                                                <div class="wp-block-latest-posts__featured-image alignleft">
                                                    <a href="noticia.html?id=${item._id}">
                                                        <img loading="lazy" decoding="async" width="150" height="150" src="${imagemUrl}" alt="Mindful Living: Incorporating Meditation into Your Daily Routine"
                                                style="height:80%"  /></a>
                                        </div><a class="wp-block-latest-posts__post-title"  href="noticia.html?id=${item._id}" >${titulo}</a>
                                       
                                                `;
                            
                                                // Loop through each news container and append the news card
                                                Array.from(newsContainers).forEach(container => {
                                                    container.appendChild(newsCard.cloneNode(true));
                                                });
                                            });
                                        }
                                    })
