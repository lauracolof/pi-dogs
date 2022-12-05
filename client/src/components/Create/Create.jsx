import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDogTemperament, postDog } from '../../redux/actions';
import './Create.css';

function refreshPage() {
  window.location.reload(false);
};

const validate = function (input) {
  let errors = {};
  if(!input.name) errors.name = `Complete the Breed name is required`;
  if(input.minHeight > input.maxHeight) errors.minHeight = 'Minim height must not surmount the Maximus height';
  if(input.minWeight > input.maxWeight) errors.minWeight = `Minim weight must not surmount the Maximus weight`;
  if(input.minHeight <= 5) errors.minHeight = `Minim height should be higher than 5in`;
  if(input.maxWeight <= 1) errors.maxWeight = `Maximus weigth should be higher than 1kg`;
  if(!input.minHeight) errors.minHeight = `Complete with a minimus height is required`;
  if(!input.maxHeight) errors.maxHeight = `Complete with a Maximus height is required`;
  if(!input.minWeight) errors.minWeight = `Complete with a minimus weight is required`;
  if(!input.maxWeight) errors.maxWeight = `Complete with a Maximus weight is required`;
  if(input.lifeSpan < 0) errors.lifeSpan = 'A life span cannot be lower thatn 0';
  if(input.lifeSpan > 22) errors.lifeSpan = `The world's longest-lived dog lived 22 years`;
  
  return errors;
};


export default function Create() {
  const dispatch = useDispatch();
  const temperament = useSelector((state) => state.temperaments);
  const [errors, setErrors ] = useState({});

  const [input, setInput] = useState({
    name: '', 
    minHeight: '', 
    maxHeight: '', 
    minWeight:'', 
    maxWeight: '',
    lifeSpan: '',
    image: '',
    temperament: []
  });

  function handleChange(event) {
    //target es el atributo que disparó el evento
    const property = event.target.name;
    //value es ese valor
    const value = event.target.value;
    setInput({
      ...input,
      [property]: value
    })
  };

  function handleSelect(event) {
    //value es ese valor
    const value = event.target.value;
    setInput({
      input,
      temperament: [input.temperament, value]
    })
  };

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    setErrors(validate(input))
    const errorSave = validate(input)
    if(Object.values(errorSave).length !== 0) {
      alert (`Please, check if you have filled in all the required fields to create a new dog`)
    } else {
      dispatch(postDog(input))
      navigate('/home')
      alert(`Dog created successfully`)
      setInput({
        name: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        lifeSpan: '',
        image: '',
        temperament: []
      })
    }
  }

  useEffect(() => {
    dispatch(getDogTemperament())
  }, [dispatch]);

  return (
    <div className='backgroundd'>
      <button 
        type='submit'
        onClick={refreshPage}
        className='refresh'>
          <img className='icon' src='https://htmlacademy.ru/assets/icons/reload-6x-white.png' alt="" />
        </button>

        <Link to='/home' className='buttonn'>Home</Link>

        <div className='card-container'>
        <form onSubmit={(event) => handleSubmit(event)}>
          <hr />
          <h1 className='titlee'>Create your own dog!</h1>

          <div className='breed'>
            <label>Breed</label>
            <input 
              type="text"
              className='breedInput'
              value={input.name}
              name='name'
              placeholder='Breed`s name'
              onChange={(event) => handleChange(event)} />
              {errors.name && <p className='error'>{errors.name}</p>}
          </div>
          
        </form>
        </div>


    </div>
  )


}
