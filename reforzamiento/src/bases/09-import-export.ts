//import { heroes as MisHeroesFavoritos, type Hero // es dicar que se esta utiliznado como una interface
// } from "./08-interfaces-enumeraciones"
import heroes, { heroes as heroesArray, type Hero, Owner } from "./08-interfaces-enumeraciones"

/*
const getHeroById = (id: number):Hero => {
    // find method para buscar dentro de un arreglo
    const hero = heroes.find( (hero) => {
        return hero.id === id;
    })

    if( !hero){
        throw new Error(`No existe un hero con el id ${ id }`);
    }

    return hero;
};

console.log(getHeroById(4))
*/
/*

/// FUNCION GetHeroByOwner CON FOREACH CLASICO 
export const getHeroByOwner = (ownerParam:Owner): Hero[] => {
    const newArray = [];
    for (let i=0; i < heroesArray.length; i++) {
        if(heroesArray[i].owner === ownerParam) {
            console.log('Array dentro del for ' + heroesArray[i]);
            newArray.push(heroesArray[i]);
        }
    }
    return newArray;
};*/
 
// Funcion  GetHeroByOwner utilizando funcion fecha
/*
export const getHeroByOwner = (owner:Owner): Hero[] => {
    const newArray: Hero[] = heroes.filter( hero => hero.owner === owner); 
    return newArray;
};*/

export const getHeroByOwner = (owner:Owner): Hero[] =>  heroes.filter( hero => hero.owner === owner);