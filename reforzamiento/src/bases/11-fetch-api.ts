import type { GiphyRandomResponse, Gif } from "../data/giphy.response";

const API_KEY = 'uL0qRwHGGcJK5PfsJy6fFt9PoijXgRnM';

const myRequest = fetch(
    `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`
);

const createImageInsideDOM = (url: string) => {
    const imgElement = document.createElement('img');
        imgElement.src = url;

        document.body.append(imgElement);
};

myRequest
    .then((response) => response.json())
    .then(({data}:GiphyRandomResponse) => { // {data} : GIf destructura el objeto
        const imageUrl = data.images.original.url;
        createImageInsideDOM(imageUrl);
    })
    .catch( (err) => {
    console.log(err);
});