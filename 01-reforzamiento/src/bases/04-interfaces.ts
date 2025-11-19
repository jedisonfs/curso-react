interface Person {
    firstName: string,
    lastName: string,
    age: number,
    address: Address
}

interface Address {
    codePostal: number,
    city: string
}

const ironman: Person = {
    firstName: 'Tony',
    lastName: 'Stark',
    age: 40,
    address: {
        codePostal: 12345,
        city: 'New York'
    }
}

console.log(ironman);