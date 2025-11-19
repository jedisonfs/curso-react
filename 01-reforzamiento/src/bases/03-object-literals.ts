const iroman = {
    firstName: 'Jhon',
    lastName: 'Feria',
    age: 31,
    addres: {
        postalCode: 33101,
        city: 'Chicago'
    }
};

const spiderman = iroman; // Se le esta pasando la refernecia de memoria del objeto iroman
const superman = {...iroman}; // Propagacion de propiedades con SPEARD

spiderman.firstName = 'Fabian';
spiderman.lastName = 'Feria';
spiderman.age = 30;


superman.firstName = `Fabian ${iroman.lastName}
                       Es una persona buenas`;
superman.addres.city  = 'Bogota'; // Objetos internos no se pueden modificar cuando se usan las ...Spread