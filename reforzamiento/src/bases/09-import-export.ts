//import { heroes as MisHeroesFavoritos, type Hero // es dicar que se esta utiliznado como una interface
// } from "./08-interfaces-enumeraciones"
import { heroes, type Hero } from "./08-interfaces-enumeraciones"


const getHeroById = (id: number):Hero => {
    
    const hero = heroes.find( (hero) => {
        return hero.id === id;
    })

    if( !hero){
        throw new Error(`No existe un hero con el id ${ id }`);
    }

    return hero;
};

console.log(getHeroById(4))