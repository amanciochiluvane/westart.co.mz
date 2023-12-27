
import imageUrlBuilder from 'https://cdn.skypack.dev/@sanity/image-url';

const builder = imageUrlBuilder({
  projectId: 'bi327w6t',
  dataset: 'production',
  apiVersion: '2021-10-21',
  useCdn: true,
});

let PROJECT_ID = "bi327w6t";
let DATASET = "production";


const urlParams = new URLSearchParams(window.location.search);
const noticiaId = urlParams.get('id');

              
              if (noticiaId) {

                  const PROJECT_URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/doc/${DATASET}/${noticiaId}`;   




// fetch the content
fetch(PROJECT_URL)
  .then((res) => res.json())
  .then(({ documents }) => {
   
      

      // Extrai as informações do primeiro item (o mais recente)
      const item = documents[0];

// Loop sobre os itens em destaque
      
          const slide = document.getElementsByClassName('cs-hero-type-1__item cs-entry');

        const thumbnail = document.querySelector('.cs-overlay-background img');
        
        
        const thumbnail3 = document.querySelector('#hig');
        
        const title = document.querySelector('.cs-entry__title');
        const categoria=document.querySelector('.cs-catg');
       
         
        // Atualiza os elementos HTML com os dados do item
        thumbnail.src = builder.image(item?.imagem?.asset?._ref);
        thumbnail.srcset = builder.image(item?.imagem?.asset?._ref);
        //thumbnail2.src = builder.image(item?.imagem?.asset?._ref);
        //thumbnail2.srcset = builder.image(item?.imagem?.asset?._ref);
        thumbnail3.src = builder.image(item?.imagem?.asset?._ref);
        //thumbnail3.srcset = builder.image(item?.imagem?.asset?._ref);
        
        thumbnail.alt = item.titulo;
       
        title.textContent = item.titulo;
        
        categoria.textContent=item.category;
    

      // ... Your existing script

      // Add an event listener to the "Ler mais" link
     

      
      
    
  })
  .catch((err) => console.error(err));
}
