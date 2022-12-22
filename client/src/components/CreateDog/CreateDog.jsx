import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react';
import { getDogTemperament, postDog } from '../../redux/actions';
import './CreateDog.css';

function refreshPage() {
  window.location.reload(false);
}

const validate = function (input) {
  let errors = {};
  if (!input.name) errors.name = 'Breed name field is required';
  
  if (input.minHeight > input.maxHeight) {
    errors.minHeight = 'The minimum height must not be greater thant the maximum height';
  };

  if (input.minWeight > input.maxWeight) {
    errors.minWeight = 'The minimum weight must not be greater thant the maximum weight';
  };
  if (input.minHeight <= 5) {
    errors.minHeight = `Minimum height should be higher thatn 5cm`;
  }
  
  if (input.maxWeight <= 1) {
    errors.maxWeight = `Maximum weight should be higher than 2 kg.`;
  };

  if (!input.minHeight) {
    errors.minHeight = `Minimum height field is required`;
  };
  
  if (!input.minWeight) {
    errors.minWeight = `Minimum weight field is required`;
  };

  if (!input.maxHeight) {
    errors.maxHeight = `Maximum height field is required`;
  };

  if (!input.maxWeight) {
    errors.maxWeight = `Maximum weight field is required`;
  };

  if (input.lifeSpan < 0) {
    errors.lifeSpan = `A lifeSpan cannot be lower than 0`;
  };

  if (input.lifeSpan > 22) {
    errors.lifeSpan = `The world's longest-lived dog lived 22 years`;
  };

  return errors;
};

export default function DogCreate () {
  const dispatch = useDispatch();
  const temperament = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: '',
    minHeight: '',
    maxHeight: '',
    minWeight: '',
    maxWeight: '',
    lifeSpan: '',
    image: '',
    temperament: []
  });

  function handleChange (e) {
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })
  };

  function handleSelect(e) {
    setInput ({
      ...input,
      temperament: [...input.temperament, e.target.value]
    })
  };

  const navigate = useNavigate();

  function handleSubmit (e) {
    e.preventDefault();
    setErrors(validate(input));
    const errorSaver = validate(input)
    if(Object.values(errorSaver).length !== 0) {
      alert(`Please, fullfill all the required fields to continue`);
    } else {
      dispatch(postDog(input))
      //red to home
      navigate('/home')
      alert(`Dog created successufully`)
      //seteamos los campos en vacío
      setInput({
        name: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        lifeSpan: '',
        temperament: []
      })
    }
  };

  useEffect(() => {
    dispatch(getDogTemperament())
  }, [dispatch]);

  return (
    <div className='backgroundd'>
      <button type='submit' onClick={refreshPage} className='refreshh'>
        <img className='icon' src='https://htmlacademy.ru/assets/icons/reload-6x-white.png' alt="" />
      </button>

      <Link to='/home' className='buttonn'>Home</Link>

      <div className='card-containerr'>
        <form onSubmit={(e) => handleSubmit(e)}> <hr/>

        <h1 className='titlee'>Create a new dog</h1>

        <div className='breed'>
          <label>Breed</label>
          <input 
            className='breedInput'
            type='text'
            value={input.name}
            name='name'
            placeholder='Breed`s name'
            onChange={(e) => handleChange(e)}
            />
            {errors.name && <p className='error'>{errors.name}</p>}
        </div>

        <div className='minHeight'>
          <label>Minimum height</label>
          <input 
            className='minHeightInput' 
            type='number'
            min='1'
            max='99'
            value={input.minHeight}
            name='minHeight'
            placeholder='Minimum height'
            onChange={(e) => handleChange(e)}
            />
            {errors.minHeight &&
              <p className='error'>{errors.minHeight}</p>}
        </div>

        <div className='maxHeight'>
          <label>Maximum height</label>
          <input 
            className='maxHeightInput' 
            type='number'
            min='1'
            max='99'
            value={input.maxHeight}
            name='maxHeight'
            placeholder='Maximum height'
            onChange={(e) => handleChange(e)}
            />
            {errors.maxHeight &&
              <p className='error'>{errors.maxHeight}</p>}
        </div>

        <div className='minWeight'>
          <label>Minimum weight</label>
          <input 
            className='minWeightInput' 
            type='number'
            min='1'
            max='99'
            value={input.minWeight}
            name='minWeight'
            placeholder='Minimum weight'
            onChange={(e) => handleChange(e)}
            />
            {errors.minWeight &&
              <p className='error'>{errors.minWeight}</p>}
        </div>

        <div className='maxWeight'>
          <label>Maximum weight</label>
          <input 
            className='maxWeightInput' 
            type='number'
            min='1'
            max='99'
            value={input.maxWeight}
            name='maxWeight'
            placeholder='Maximum height'
            onChange={(e) => handleChange(e)}
            />
            {errors.maxWeight &&
              <p className='error'>{errors.maxWeight}</p>}
        </div>

        <div className='lifeSpan'>
          <label>Life span</label>
          <input 
            className='lifeSpanInput' 
            type='number'
            min='1'
            max='22'
            value={input.lifeSpan}
            name='lifeSpan'
            placeholder='Breed`s life span'
            onChange={(e) => handleChange(e)}
            />
            {errors.lifeSpan &&
              <p className='error'>{errors.lifeSpan}</p>}
        </div>

        <div className='picture'>
          <label>Image</label>
          <input 
            className='pictureInput'
            type='text'
            value={input.image}
            name='image'
            placeholder='Breed`s image URL'
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <select 
            onChange={(e) => handleChange(e)} 
            className='listTemps'>
              {temperament.map((temperament) => (
                <option value={temperament}>{temperament}</option>
              ))}
          </select>
        </div>

        <div className='temperamentsItems'>
          <ul>{input.temperament.map((el) => el + '. ')}</ul>
        </div>

        <div>
          <button className='createDogButton' type='submit' disabled = 
          {input.temperament.length < 2 || input.temperament.length >= 5 ? true : false }>
            Create dog
          </button>
        </div>
        </form>
      </div>   
    </div>
  )
};