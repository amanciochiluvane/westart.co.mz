
    import imageUrlBuilder from 'https://cdn.skypack.dev/@sanity/image-url';

    const builder = imageUrlBuilder({
        projectId: 'bi327w6t',
        dataset: 'production',
        apiVersion: '2021-10-21',
        useCdn: true,
    });

    let PROJECT_ID = "bi327w6t";
    let DATASET = "production";
    let QUERY = encodeURIComponent('*[_type == "imprensa"]');

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
                const recentItem = result[0];
                const newsContainers = document.getElementsByClassName('publicidade1')[0];

                if (recentItem && newsContainers) {
                    const imageUrl = builder.image(recentItem?.imagem?.asset?._ref);
                    newsContainers.style.backgroundImage = `url(${imageUrl})`;
                }
            }
        })
