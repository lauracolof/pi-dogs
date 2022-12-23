import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { getDogsName } from "../../redux/actions";
import './SearchBar.css';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault(e);
    dispatch(getDogsName(name));
    setName('');
  };

  return (
    <div className='search'>
      <div className='searchInputs'>
        <input type='text'
          placeholder='Find a dog!'
          value={name}
          onChange={(e) => handleInputChange(e)}
        />
        <div className='searchIcon'>
          <button 
            className='button'
            type='submit'
            onClick={(e) => handleSubmit(e)}
          >
            🔍 
          </button>
        </div>
      </div>
      <div className='dataResult'></div>
    </div>
  );
}