import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import './CardDetail.css';
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Link } from "react-router-dom";

export default function Detail() {

  const dispatch = useDispatch();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const dog = useSelector((state) => state.detail);
  
  useEffect(() => {
    dispatch(getDetail(id))
  }, [dispatch, id]);

  return (
    <>
      <div>
        {
          dog.length && loading !== true 
          ? <div className='card-containeer'>
              <div className='wallpapeerr'>
                <h1 className='naame'>{dog[0].name}</h1>
                <img src={dog[0].image} className='pcture' alt="" />
                <h3 className='temperameents' key={dog} position='relative' top='40px'>Temperaments</h3>

                <p className="pTemperament">
                { dog[0].temperaments ? " " + dog[0].temperaments.map((t) => t.name).join(', ') : dog[0].temperament }
                </p>
                
                <h3 className='Height' position='relative' top='40px'>Breed's height</h3>

                <p className="pHeight">
                { dog[0].minHeight ? " " + dog[0].minHeight + " - " + dog[0].maxHeight : dog[0].height} 
                cm</p>
                <h3 className='Weight' position='relative'>Breed's weight</h3>

                <p className="pWeight">{ dog[0].minWeight ? " " + dog[0].minWeight + " - " + dog[0].maxWeight : dog[0].weight }kg</p>
                <h3 className='lifeSpan' position='relative'>Breed's life span</h3>
                               
                <p className="pLifeSpan">{dog[0].lifeSpan}</p>
                
              </div>
              <Link to={'/home'}>
                  <button className="btnBack">Back</button>
                </Link>
            </div> 

          : <LoadingScreen setLoading={setLoading} />
        }
      </div>
    </>
  );
}