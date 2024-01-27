import React from "react";
import { Link } from 'react-router-dom'


const Nav = () => {
  return (
    <nav>
        <ul className="nav-bar">
            <li><Link className={'link'} to='/'>Lista</Link></li>
            <li><Link className={'link'} to='/search'>Buscador</Link></li>
            <li><Link className={'link'} to='/new'>Crear nuevo</Link></li>
        </ul >
    </nav >
)
};

export default Nav;