
                                                                 
import imageUrlBuilder from 'https://cdn.skypack.dev/@sanity/image-url';

let PROJECT_ID = "bi327w6t";
let DATASET = "production";

const builder = imageUrlBuilder({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: '2021-10-21',
    useCdn: true,
});

const urlParams = new URLSearchParams(window.location.search);
const noticiaId = urlParams.get('id');


if (noticiaId) {
  
    // Construa a URL para obter os detalhes da notícia usando noticiaId
    const noticiaIdOriginal = noticiaId.replace(/--/g, ' ');

let QUERY = encodeURIComponent(`*[_type == "destaque" && titulo == "${noticiaIdOriginal}"]`);


let DETAIL_URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

   

    // Fetch para obter os detalhes da notícia
    fetch(DETAIL_URL)
  .then((res) => res.json())
  .then(({ result }) => {
      const item = result[0];
      
      
      // Atualize os elementos HTML com os detalhes da notícia
      
      const descricaoNoticia = document.querySelector('.entry-content');
      const authorAvatar = document.querySelector('.cs-meta-author-avatar img');

    
const author = document.getElementById('ttu');
const entryDate = document.querySelector('.cs-entry__footer-value');


   
author.textContent=item.autor;
entryDate.textContent = formatarData(item.data);
authorAvatar.src = builder.image(item?.autimg?.asset?._ref);

      
        
      // Limpe o conteúdo atual do elemento antes de adicionar o novo conteúdo
      if(descricaoNoticia){

// Adicione os blocos de texto ao elemento
item.corponoticia.forEach((block) => {
let blockElement;

// Crie um elemento HTML correspondente ao tipo de bloco
if (block.style === 'h3' || block.style === 'h4' || block.style === 'blockquote') {
blockElement = document.createElement(block.style);

// Adicione outras verificações de estilo conforme necessário

// Aplique estilos adicionais com base nas informações do bloco
if (block.style === 'h3') {
blockElement.style.fontWeight = '400';
blockElement.style.fontSize = '19px';
blockElement.style.marginBottom = '10px';
} else if (block.style === 'h4') {
blockElement.style.fontWeight = '600';
blockElement.style.fontSize = '18px';
blockElement.style.marginBottom = '10px';
} else if (block.style === 'blockquote') {
blockElement.style.borderLeft = '2px solid #333';
blockElement.style.paddingLeft = '10px';
blockElement.style.marginBottom = '10px';
}
} 
else if (block.listItem === 'bullet') {

const listElement = document.createElement('li');

listElement.style.fontSize = '16px';
listElement.style.marginBottom = '5px';
blockElement = listElement;
} 




else{
// Se o tipo não for 'block' ou lista, crie um elemento padrão (não uma div)
blockElement = document.createElement(block.marks ? block.marks[0] : 'p');
blockElement.style.fontSize='16px';
}

// Atribua o conteúdo do bloco ao elemento
blockElement.innerHTML = block.children.map((child) => {
if (child.marks && child.marks.length > 0) {
const mark = child.marks[0];
if (mark === 'strong') {
return `<strong>${child.text}</strong>`;
}
else if (mark === 'em') {
return `<em>${child.text}</em>`;
}
}
return child.text;
}).join('');

// Adicione o bloco ao elemento da descrição
descricaoNoticia.appendChild(blockElement);
});


  }                         
      // Adicione outros elementos conforme necessário
    })
  .catch((err) => console.error(err));
  


// Função para formatar a data

}

function formatarData(dataString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const data = new Date(dataString);
  return data.toLocaleDateString('pt-BR', options);
}
