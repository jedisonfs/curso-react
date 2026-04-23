import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Opcional para estilos

export const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">Mi Proyecto</div>
            <ul className="nav-links">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? 'active' : ''}
                    >
                        Inicio
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/plan-estudio"
                        className={({ isActive }) => isActive ? 'active' : ''}
                    >
                        Plan de Estudio
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/pre-fase leetcode"
                        className={({ isActive }) => isActive ? 'active' : ''}
                    >
                        Pre-Fase leetcode
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/Fase 1 - Monolito "
                        className={({ isActive }) => isActive ? 'active' : ''}
                    >
                        Fase 1 - Monolito
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};