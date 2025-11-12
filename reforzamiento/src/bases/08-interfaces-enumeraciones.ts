 // NOs permite asignar una estructura parecido a interface 
 // o indicar un valor por defecto que se pueden utilizar
// type Owner = 'DC' | 'Marvel';

export interface Hero {
  id: number;
  name: string;
  owner: Owner;
}

export enum Owner {
  DC,
  Marvel
}

export const heroes: Hero[] = [
  {
    id: 1,
    name: 'Batman',
    owner: Owner.DC
  },
  {
    id: 2,
    name: 'Spiderman',
    owner: Owner.Marvel,
  },
  {
    id: 3,
    name: 'Superman',
    owner: Owner.DC,
  },
  {
    id: 4,
    name: 'Flash',
    owner: Owner.DC,
  },
  {
    id: 5,
    name: 'Wolverine',
    owner: Owner.Marvel,
  },
];

console.log(heroes)

export default heroes;