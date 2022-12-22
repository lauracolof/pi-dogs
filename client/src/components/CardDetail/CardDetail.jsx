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

  useEffect(() => {
    dispatch(getDetail(id))
  }, [id]);

  const selectedDog = useSelector((state) => state.detail);

  return (
    <>
      <div className='wallpapeerr' />
      <div>
        {
          selectedDog.length > 0 && loading !== true 
          ? <div className='card-containeer'>
              <div className='wallpapeerr'>
                <h1 className='naame'>{selectedDog[0].name}</h1>
                <img src={selectedDog[0].image} alt="" width='476px' height='300px' className='pcture' />
                <h2 className='temperameents'>A dog breed  is a group of dogs that have characteristics that are very similar or nearly identical in appearance or behavior or generally both. Some of these are: {!selectedDog[0].createdAtDb ? selectedDog[0].temperament : selectedDog[0].temperaments.map(e => e.name + (', ') ) }.</h2>
                <h3 className='heightAndWeightAndSpan'>Breed's height: {selectedDog[0].height}cm</h3>
                <h3 className='heightAndWeightAndSpan'>Breed's weight: {selectedDog[0].weight}kg</h3>
                <h4 className='heightAndWeightAndSpan'>Breed's life span: {selectedDog[0].createdAtDb ? selectedDog[0].lifeSpan + 'yers' : selectedDog[0].lifeSpan}</h4>
              </div>
            </div> 

          : <LoadingScreen setLoading={setLoading} />
        }
      </div>
    </>
  );
}