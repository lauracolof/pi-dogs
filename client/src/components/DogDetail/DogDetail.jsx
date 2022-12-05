import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector  } from "react-redux";
import { getDetail } from "../../redux/actions";
import './DogDetail.css';
import LoadingScreen from '../Loading/Loading';

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getDetail(id))
  }, [id])

  const selectDog = useSelector(state => state.detail);

  return (
    <>
      <div className='wallpapeerr'/>
      <div>
        {selectDog.length > 0 && loading !== true 
          ? 
            <div className='card-containeer'>
              <div className='wallpapeerr'>
                <h1 className='naame'>{selectDog[0].name}</h1>
                <img src={selectDog[0].image} alt="" width='476px' height='300px' className='pcture'/>
                <h2 className='temperameents'>Each breed has it own way of being, which differences every dog from each other. This breed possesses the following temperaments: {!selectDog[0].createdAtDb ? selectDog[0].temperament : selectDog[0].temperaments.map(t => t.name + (', ') )}.</h2>
                <h3 className='heightAndWeightAndSpan'>
                  Breed's height: {selectDog[0].height}cm
                </h3>
                <h3 className='heightAndWeightAndSpan'>
                  Breed's weight: {selectDog[0].weight}kg
                </h3>
                <h4 className='heightAndWeightAndSpan'>
                  Breed's life span: {selectDog.createdAtDb ? selectDog[0].lifeSpan + 'years' : selectDog[0].lifeSpan}
                </h4>
              </div>
            </div> 
          : 
          <LoadingScreen setLoading={setLoading} />
        } 
      </div>
    </>
  )
};