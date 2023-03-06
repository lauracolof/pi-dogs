import React from "react";
import { Link } from 'react-router-dom';
import './NavBar.css';
import Icon from '../img/Fouuu.png';
import SearchBar from '../SearchBar/SearchBar.jsx';

const NavBar = ({ brand }) => {
  return (
    <div>
      <nav className='navBar'>
        <Link to={'/home'} className='title'>
          {brand}
          <img src={Icon} className='Icon' alt="" />
        </Link>

        <Link to={'/dogs'}>
          <button className='btn'>Create your own breed</button>
        </Link>

        <SearchBar placeholder='Search a dog!' />
      </nav>
    </div>
  );
}

export default NavBar;