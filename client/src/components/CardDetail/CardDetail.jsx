import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import './CardDetail.css';
import LoadingScreen from "../LoadingScreen/LoadingScreen";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const selectedDog = useSelector((state) => state.detail);
  console.log(selectedDog);

  useEffect(() => {
    dispatch(getDetail(id))
  }, []);


  return (
    <>
      <div className='wallpapeerr' />
      <div>
        {
          selectedDog.length > 0 && loading !== true 
          ? <div className='card-containeer'>
              <div className='wallpapeerr'>
                <h1 className='naame'>{selectedDog[0].name}</h1>
                <img src={selectedDog[0].image} alt="" width='300px' className='pcture' />
                <h2 className='temperameents'>Temperaments: {selectedDog[0].temperaments.map((t) => t.name).join(', ')}</h2>
                <h3 className='heightAndWeightAndSpan'>Breed's height: {selectedDog[0].minHeight + " - " + selectedDog[0].maxHeight} cm</h3>
                <h3 className='heightAndWeightAndSpan'>Breed's weight: {selectedDog[0].minWeight + " - " + selectedDog[0].maxWeight} kg</h3>
                <h4 className='heightAndWeightAndSpan'>Breed's life span: {selectedDog[0].lifeSpan + ' years'}</h4>
              </div>
            </div> 

          : <LoadingScreen setLoading={setLoading} />
        }
      </div>
    </>
  );
}