const characterName = ['Goku', 'Vegeta', 'Truns'];

const [p1] = characterName; // aca si importa la posicion en el arreglo
const [, p2, ] = characterName; // CON la coma indicamos que no queremos estos valores
const [,,trunks] = characterName; // NO es comun usar esta sintaxis

console.log({ trunks });

const returnArrayFn = () => {
    return ['ABC', 123] as const // Se dice que son const que es primero un numero y luego un letra
}

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