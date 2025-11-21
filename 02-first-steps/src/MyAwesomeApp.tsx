import type { CSSProperties } from "react";

const firstName = 'Edison';
const lastName = 'Feria';

const favoriteGames = ['Elden Ring', 'Smash', 'Metal Gear'];
const isActive = true;

const address = {
    zipCode: 'ABC',
    country: 'CANADA'
};

/* 
Este nos permite utilizar un style css por fuera de la etiqueta style = {{}} const myStyle = {}
cuando se deja de seta forma no se tiene ayuda del editor para autocompletado

*/
const myStyles: CSSProperties = { /* Este cssProperties nos permite decir que es de tipo propiedad de css, esto solo funciona con typeScripte */
    backgroundColor: '#fafafa',
    borderRadius: 20,
    padding: 10
};

export function MyAwesomeApp() {
    {/* Es mejor dejar a fuera los const es mas efectivo
        porque los cambios de estado de react, ejecuta constantemente los componente para validar si hay si hay cambios
        lo mejor es dejar las variables que no cambian a fuera para que esto no afecte el rednimiento de react  */}
    return (
        <>
            <h1>{firstName}</h1>
            <h3>{lastName}</h3>

            <p>{favoriteGames}</p>
            <p>{2 + 2}</p> {/* {} PErmiten imprimir varibles de js en pantalla dentro de los fragmento*/}

            <h1>{isActive ? 'Activo' : 'No Activo'}</h1> {/* SE utiliza el ternario porque react no reconoce los boolean */}
            <p style={myStyles}>{JSON.stringify(address)}</p > {/* JSON.stringify() recibe un objeto y este nos permite imprimirlo en una etiqueta */}


        </>
    );
}

// export function MyAwesomeApp() {
//     return (
//         <div>
//             <h1>Edison</h1>
//             <h3>Feria Sanabria</h3>
//         </div>
//     );
// }