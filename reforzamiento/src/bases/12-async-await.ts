import type { GiphyRandomResponse, Gif } from "../data/giphy.response";

const API_KEY = 'uL0qRwHGGcJK5PfsJy6fFt9PoijXgRnM';

const createImageInsideDOM = (url: string) => {
    const imgElement = document.createElement('img');
        imgElement.src = url;

        document.body.append(imgElement);
};

/* 
* Funcion async - await - SE espera que sea una funciona que trabaja y crea promesas
* la idea es que poder trabajar y esperar que la promesa se resuelva y poder 
* trabajar con esta respuesta de forma secuencias asi esta secuencia tenga que consultar 
* la nuebe o generar algun tipo de calculo pero que se puede leer de forma sincrona
* para esto es asycn - await
*/
const getRandomGifUrl = async () => {
    //Sabemos que devuelve esto return new Promise(() => {}); esto es lo mismo que devuelve el async 
    // await nos sirve hacer lo que es para obtener la respuesta de una promise, que equivale a then(response => console.log()) extre la respuesta solo con la await
    const response = await fetch( // para que await funcine tiene que estar dentro de una funcion asycn
    `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`
    );

    const {data}: GiphyRandomResponse = (await response.json());

    return data.images.original.url; /// DICe que devuelve un promise de tipo string asycn nos sirve para reducir codigo
};

getRandomGifUrl().then(url => createImageInsideDOM(url))
.catch(err => {throw new Error(`¡No se encontro alguna respuesta del Gifphy Developer ${err}`)})
.finally(() => console.log('SE termino el flujo de asycn - await'));