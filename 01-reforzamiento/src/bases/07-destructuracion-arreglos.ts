const characterName = ['Goku', 'Vegeta', 'Truns'];

const [p1] = characterName; // aca si importa la posicion en el arreglo
const [, p2, ] = characterName; // CON la coma indicamos que no queremos estos valores
const [,,trunks] = characterName; // NO es comun usar esta sintaxis

console.log({ trunks });

const returnArrayFn = () => {
    // as const 
    return ['ABC', 123] as const // Se dice que son const que es primero un numero y luego un letra
}

// DE esta forma no sabe typescript si es una letra o numero
// Esto no es type safe - no es seguro porque no sabe cuales es number y string
// Con as const -> No es tupa 
// as const -> LE dice a type script SIEMPRE va arreglesar ese orden primero string y number
// es un tipo de tipado escrito que debe cumplir y cuando utiliza la vairbale letras siempre sera letras y number siempre numeros
const [ letras, numeros] = returnArrayFn();

console.log(numeros + 100);


// TAREA useState

function useState(name:string){
    return [
        name,
        (name2:string) => {
            console.log(name2); 
        } 
    ] as const;
}

const [name1, setName] = useState('Goku');
console.log(name1);
setName('Vegeta');

const useState2 = (value:string) => {
    return [
        value,
        (newValue:string) => {
            console.log(newValue);
        }
    ] as const
}

const [name2, setName2] = useState('Goku');
console.log(name1);
setName('Vegeta');