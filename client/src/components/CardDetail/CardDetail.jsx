import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import './CardDetail.css';
import LoadingScreen from "../LoadingScreen/LoadingScreen";

export default function Detail({name, image, temperament, temperaments, height, weight, minHeight, maxHeight, minWeight, maxWeight, createdAtDb }) {

  const dispatch = useDispatch();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const dog = useSelector((state) => state.detail);
  
  useEffect(() => {
    dispatch(getDetail(id))
  }, []);

  console.log("DOG", dog)
  console.log("IDS:", id)

  


  return (
    <>
      <div className='wallpapeerr' />
      <div>
        {
          dog.length && loading !== true 
          ? <div className='card-containeer'>
              <div className='wallpapeerr'>
                <h1 className='naame'>{dog[0].name}</h1>
                <img src={dog[0].image} alt="" width='300px' position='relative' top='-25px' left='11px' className='pcture' />
                <h2 className='temperameents' position='relative' top='40px'>Temperaments: 
                {  dog[0].image ? temperaments.map((t) => t.name).join(', ') : dog[0].temperament
                }</h2>
                <h3 className='heightAndWeightAndSpan' position='relative' top='40px'>Breed's height: 
                { dog[0].height} cm</h3>
                <h3 className='heightAndWeightAndSpan' position='relative'>Breed's weight: { + " " + dog[0].weight} kg</h3>
                <h4 className='heightAndWeightAndSpan' position='relative'>Breed's life span: {dog[0].lifeSpan} </h4>
              </div>
            </div> 

          : <LoadingScreen setLoading={setLoading} />
        }
      </div>
    </>
  );
}