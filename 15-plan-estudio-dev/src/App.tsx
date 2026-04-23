import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StudyPlan  from './component/planestudiodev.tsx';
import StockFlowBlueprint  from './component/FaseUno/faseunomonolito.tsx';
import {Navbar} from "./component/navbar/NavBar.tsx";
import LeetCodePlan from "./component/Prefase/prefase.tsx";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
        <Navbar /> {/* Barra simpre visible*/}

        <main>
            <Routes>
                <Route path="/" element={<h1>Bienvenido</h1>} />
                <Route path="/pre-fase leetcode" element={<LeetCodePlan/>} />
                <Route path="/plan-estudio" element={<StudyPlan />} />
                <Route path="/Fase 1 - Monolito" element={<StockFlowBlueprint/>} />
                {/* Ruta para manejar errores 404 */}
                <Route path="*" element={<h1>404 - No encontrado</h1>} />
            </Routes>
        </main>
    </BrowserRouter>
  )
}

export default App
