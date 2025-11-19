
/* La promesa tiene 3 estados un
Then lo que sucede si la respuesta es positivoa  -> Y es con esta reaspuesta se puede utilizar para reealizar alguna operacion
Cath Captura la exception o el error que devuelve la promesa
Finally => Siempre se ejecuta Independiente si se ejecuta el cath o el then

new Promise<T> -> Es un generico T parecido a JAVA
*/
const myPromise = new Promise<number>( (resolve, reject) => {

    setTimeout ( () => {
        resolve(1.000); // Se le devuelve los 100 dolares a la persona
        reject(`Mi amigo se perdio`);

    }, 2000);

} );

myPromise.then( (myMoney) => {
    console.log(`Tengo mi dinero ${myMoney}`);
}).catch( reason =>{
    console.warn(reason);
} ).finally(() => {
    console.log('Pues a seguir con mi vida');
});