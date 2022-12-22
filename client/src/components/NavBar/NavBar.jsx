import React from "react";
import { Link } from 'react-router-dom';
import './NavBar.css';
import Fou from '../img/Fouuu.png';
import SearchBar from '../SearchBar/SearchBar.jsx';

const NavBar = ({ brand }) => {
  return (
    <div>
      <nav className='navBar'>
        <Link to={'/home'} className='title'>
          {brand}
          <img src={Fou} className='Fou' alt="" />
        </Link>
        <Link to='/dog' className='Creation'>
          Create your dog!
        </Link>
        <SearchBar placeholder='Search a dog!' />
      </nav>
    </div>
  );
}

export default NavBar;