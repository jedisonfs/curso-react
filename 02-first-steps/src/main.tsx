import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FirstStepApp } from './FirstStepApp.tsx'
import { MyAwesomeApp } from './MyAwesomeApp.tsx'

createRoot(document.getElementById('root')!).render(
/*
Si se quita el StrictMode la aplicacion falla porque en react sin el stictmode solo permite una etiqueta html
se debe regresar una sola etiqueta, se puede devolver un <div> </div> esto porque todo lo que tiene adentro
cuando como parte de un dix es lo mas utilizado apra resolver este error
*/

  <StrictMode> /*modo estricto de react para que se puedan detectar errores cuando se recarga la pagina */
    <FirstStepApp/> /* Los framentos en react son capatilizados de esta forma funcionan */
    <MyAwesomeApp/>
  </StrictMode>
)