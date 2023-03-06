import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDogTemperament, postDog } from '../../redux/actions';
import './CreateDog.css';

const validate = function (input) {
  let errors = {};

  if(!input.name) errors.name = `Breed's name is required`;
  if(input.minHeight > input.maxHeight) errors.minHeight = `Cannot exceed the max height`;
  if(!input.minHeight) errors.minHeight = `Complete minimal height`;
  if(!input.maxHeight) errors.maxHeight = `Complete maximum height`;
  if(!input.minWeight) errors.minWeight = `Complete minimal weight`;
  if(!input.maxWeight) errors.maxWeight = `Complete maximum weight`;
  if(input.minWeight > input.maxWeight) errors.minWeight = `Cannot exceed the max weight`;
  if(input.lifeSpan < 1) errors.lifeSpan = `Life span cannot be lower than 1`;
  if(input.lifeSpan > 23) errors.lifeSpan = `The world's longest-lived dog live 22 years`;
  
  return errors;
};

export default function DogCreate() {
  const dispatch = useDispatch();
  const temperament = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    minHeight: '',
    maxHeight: '',
    minWeight: '',
    maxWeight: '',
    lifeSpan: '',
    image: '',
    temperament: []
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  };

  function handleSelect(e) {
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value]
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(validate(input));
    const errorSave = validate(input);
    if(Object.values(errorSave).length !== 0) {
      alert (`Please fullfill all the required fields in the form`)
    
    } else {
      dispatch(postDog(input));
      navigate('/home');
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
  };


  useEffect(() => {
    dispatch(getDogTemperament())
  }, [dispatch]);

  return (
    <div className='backgroundd'>

      <Link to='/home' className="buttonn">Home</Link>

      <div className='card-containerr'>
        <form onSubmit={(e) => handleSubmit(e)}>

          <h1 className='subtitle'>Create a new dog</h1>

          <div className='breed'>
            {/* <label>Breed</label> */}
            <input 
              className='breedInput'
              type='text' 
              name='name'
              placeholder="Breed's name "
              value={input.name}
              onChange={(e) => handleChange (e)} />
            <div>
              {errors.name && 
              <p className='error-name'>{errors.name}</p>}
            </div>
          </div>

          <div className='minHeight'>
            {/* <label>Minimum height</label> */}
            <input 
              className='minHeightInput'
              type='number'
              min='10' 
              max='99'
              value={input.minHeight}
              name='minHeight'
              placeholder='Minimum height, min 10cm' 
              onChange={(e) => handleChange (e)} />
              {errors.minHeight && 
              <p className='error-minHeight'>{errors.minHeight}</p>}
          </div>

          <div className='maxHeight'>
            {/* <label>Maximum height</label> */}
            <input 
              className='maxHeightInput'
              type='number'
              min='10' 
              max='150'
              value={input.maxHeight}
              name='maxHeight'
              placeholder='Maximum height' 
              onChange={(e) => handleChange (e)} />
              {errors.maxHeight && 
              <p className='error-maxHeight'>{errors.maxHeight}</p>}
          </div>

          <div className='minWeight'>
            {/* <label>Minimum weight</label> */}
            <input 
              className='minWeightInput'
              type='number'
              min='1' 
              max='99'
              value={input.minWeight}
              name='minWeight'
              placeholder='Minimum weight' 
              onChange={(e) => handleChange (e)} />
              {errors.minWeight && 
              <p className='error-minWeight'>{errors.minWeight}</p>}
          </div>

          <div className='maxWeight'>
            {/* <label>Maximum weight</label> */}
            <input 
              className='maxWeightInput'
              type='number'
              min='1' 
              max='99'
              value={input.maxWeight}
              name='maxWeight'
              placeholder='Maximum weight' 
              onChange={(e) => handleChange (e)} />
              {errors.maxWeight && 
              <p className='error-maxWeight'>{errors.maxWeight}</p>}
          </div>

          <div className='lifeSpan'>
            {/* <label>Life Span</label> */}
            <input 
              className='lifeSpanInput'
              type='number'
              min='1' 
              max='23'
              value={input.lifeSpan}
              name='lifeSpan'
              placeholder='Breed`s life span in years' 
              onChange={(e) => handleChange (e)} />
              {errors.lifeSpan && 
              <p className='error-lifespan'>{errors.lifeSpan}</p>}
          </div>

          <div className='picture'>
            {/* <label>Photo</label> */}
            <input 
              className='pictureInput'
              type='text'
              value={input.image}
              name='image'
              placeholder='Image URL:' 
              onChange={(e) => handleChange (e)} />
          </div>

          <div>
            <select className='listTemps' onChange={(e) => handleSelect(e)} >
              <option hidden>Dog's temperaments</option>
              {temperament.map((temp) => (
                <option value={temp} key={temp}>{temp}</option>
              ))}
            </select>
          </div>

          <div className='temperamentsItems'>
            <ul key={temperament}>{input.temperament.map((temp) => temp + '. ')}</ul>
          </div>

          <div>
            <Link to='/home'>
              <button className='cancelButton'>Cancel</button>
            </Link>
            <button className='createDogButton' type='submit' 
            disabled={
              input.temperament.length < 2 || 
              input.temperament.length >= 7 ? true : false }>
                Create
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};