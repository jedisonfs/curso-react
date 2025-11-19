const person = {
    name: 'Tony',
    age: 15,
    key: 'Iroman'
}

//const name = person.name;
//const age = person.age;
//const key = person.key;

//const {name:iromanname, age, key} = person;
//console.log(name, age, key);


interface Hero {
    name: string,
    age: number,
    key: string,
    rank?: string
}

const userContext = ({name, age, key, rank}:Hero) => {
    //const {name, age, key, rank} = Hero;
    return {
        keyName: key,
        user: {
            name: name,
            age: age
        },
        rank: rank

    }
}


const context = userContext(person);


/// PRimero saco el rango y luego el keyname y extraer el nombre

const {rank, keyName, user: {name:namecontext}} = userContext(person);
