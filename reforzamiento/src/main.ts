import './style.css'
import './bases/09-import-export.ts'
import { getHeroByOwner } from './bases/09-import-export.ts'
import { Owner } from './bases/08-interfaces-enumeraciones.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
  <h1>Hola Mundo</h1>
  <p>Este es un parrafo para probar si se muestra mi parrafo</p>
  </div>
`
console.log("Funcion GetHeroByOwner() Marvel");
console.log(getHeroByOwner(Owner.Marvel));

console.log("Funcion GetHeroByOwner() DC");
console.log(getHeroByOwner(Owner.DC));