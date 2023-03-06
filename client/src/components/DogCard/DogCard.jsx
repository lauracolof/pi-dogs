import React from "react";
import './DogCard.css';
import { Link } from 'react-router-dom';


export default function Card ({name, image, temperament, minHeight, maxHeight, minWeight, maxWeight, temperaments, height, weight, id}) {  

  return (
    <div className='card-container'>
      <div>
        <h2 className='name'>{name}</h2>
      </div>
      <div className='image-container'>
        <img src={image} alt="" width='300px' height='300px' />
      </div>

      <div className='card-content'>
        <h4 className='Temperamentss' key={temperament}>Temperaments</h4>
          <p className="TemperamentsP">{temperaments !== undefined ? " " + temperaments.map((t) => t.name).join(', ') : " " + temperament}</p>
        <h4 className='Weightt' key={weight}>Weight</h4>
        <p className="WeightP">{minWeight !== undefined ? " " + minWeight + " - " + maxWeight + "kg" : " " + weight}</p>
        
        <h4 className='Heightt' key={height}>Height</h4>
        <p className="HeightP">{minHeight !== undefined ? " " + minHeight + " - " + maxHeight + "cm" : " " + height}</p>
        <Link to={'/home/' + id}>
          <button className='btnCard'>Learn more</button>
        </Link>
      </div>
    </div>
  );
}