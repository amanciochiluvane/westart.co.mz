
                            import imageUrlBuilder from 'https://cdn.skypack.dev/@sanity/image-url';
                        
                            const builder = imageUrlBuilder({
                                projectId: 'bi327w6t',
                                dataset: 'production',
                                apiVersion: '2021-10-21',
                                useCdn: true,
                            });
                        
                            let PROJECT_ID = "bi327w6t";
                            let DATASET = "production";
                            let QUERY = encodeURIComponent('*[_type == "destaque"]');
                        
                            let PROJECT_URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;
                        
                            // fetch the content
                            fetch(PROJECT_URL)
                                .then((res) => res.json())
                                .then(({ result }) => {
                                    // Verifica se há pelo menos um resultado
                                    if (result.length > 0) {
                                        // Sort the results in descending order based on the 'data' property (most recent first)
                                        result.sort((a, b) => new Date(b.data) - new Date(a.data));
                        
                                        // Loop sobre os itens em destaque
                                        result.slice(0, 3).forEach((item, index) => {
                                            const slide = document.querySelector(`.cs-hero-type-1__item:nth-child(${index + 1})`);
                                            const thumbnailLink = slide.querySelector('.cs-overlay-link');
                                            const thumbnail = slide.querySelector('.cs-overlay-background img');
                                            const thumbnail3 = slide.querySelector('#hig');
                                           
                                            
                                            const title = slide.querySelector('.cs-entry__title');
                                            const categoria = slide.querySelector('.cs-catg');
                                            const subtitle = slide.querySelector('.cs-entry__subtitle');
                        
                                            // Atualiza os elementos HTML com os dados do item
                                            thumbnail.src = builder.image(item?.imagem?.asset?._ref);
                                            thumbnail.srcset = builder.image(item?.imagem?.asset?._ref);
                                            thumbnail3.src = builder.image(item?.imagem?.asset?._ref);
                                            thumbnail.alt = item.titulo;
                                            
                                            title.textContent = item.titulo;
                                            subtitle.textContent = item.descricao;
                                            categoria.textContent = item.category;
                                            
                                            const tituloConverted = item.titulo.replace(/\s+/g, '--');
                                            // Adiciona um evento de clique ao link
                                            thumbnailLink.href = `/noticia/?id=${tituloConverted}`;
                                        });
                                    }
                                })
                                .catch((err) => console.error(err));
                      