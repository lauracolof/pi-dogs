import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, orderDogsByWeight, filterDogsByCreated, filterByName, filterDogsByTemperament, getDogTemperament } from "../../redux/actions";
import Card from '../DogCard/DogCard.jsx';
import './Home.css';
import Pagination from '../Pagination/Pagination.jsx';
import LoadingScreen from '../LoadingScreen/LoadingScreen.jsx';


export default function Home () {
  const dispatch = useDispatch(); //action
  const allDogs = useSelector((state) => state.dogs); // reducer
  const temperament = useSelector((state) => state.temperaments);

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // inicio en la primer página
  const [dogsPerPage, ] = useState(9) // cuántas cartas muestro por página
  const [, setPeso] = useState('');
  const [, setOrder] = useState('');

  const indexOfLastDog = currentPage * dogsPerPage // 1*8
  const indexOfFirstDog = indexOfLastDog - dogsPerPage // 8 - 8;
  const currentDog = allDogs.slice(indexOfFirstDog, indexOfLastDog) //corto el array de 0 a 7

  useEffect(() => {
    dispatch(getDogs());
  }, []);

  useEffect(() => {
    dispatch(getDogTemperament());
  }, [])

  const pagination = (numberOfPage) => {
    setCurrentPage(numberOfPage);
  };

  const lastPage = allDogs.length / dogsPerPage;
  //if i had 100dogs = 100dogs.lenght / 10 dogsPerPage => last page = 10;

  const nextPage = () => {
    if(currentPage < lastPage) {
      setCurrentPage(currentPage + 1)
    }
  };

  const prevPage = () => {
    if(currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  function handleSort(e) {
    e.preventDefault();
    dispatch(filterByName(e.target.value))
    setCurrentPage(1)
    setOrder(`${e.target.value}`);
  };

  function handleFilterDogByWeight(e) {
    e.preventDefault();
    dispatch(orderDogsByWeight(e.target.value))
    setCurrentPage(1)
    setPeso(`${e.target.value}`)
  };

  function handleFilterDogByCreated(e) {
    dispatch(filterDogsByCreated(e.target.value));
    setCurrentPage(1);
  };

  function handleFilterDogsByTemperament(e) {
    dispatch(filterDogsByTemperament(e.target.value))

  };

  function handleRefresh() {
    window.location.reload(false);
  };

  return (
    <>
    {loading === true 
      ? <LoadingScreen setLoading={setLoading} />
      : 
      <div className='doggos'>
        <div className='lists'>
          <select key='order' className='listAlpha' onChange={(e) => handleSort(e)}>
            <option hidden='all'>Default order</option>
            <option value='Asc'>A-Z</option>
            <option value='Desc'>Z-A</option>
          </select>

          <select key='weight' className='listAlpha' onChange={(e) => handleFilterDogByWeight (e)}>
            <option value='AllWeights'>Unorderer weights</option>
            <option value='HeavyWeight'>Heaviest breeds</option>
            <option value='LightWeight'>Lightest breeds</option>
          </select>

          <select key='created' className='listAlpha' onChange={(e) => handleFilterDogByCreated(e) }>
          <option hidden='AllCreated'>All breeds</option>
            <option value='Api'>Existing breeds</option>
            <option value='Created'>Created breeds</option>
          </select>

          <select key='temper' onChange={(e) => handleFilterDogsByTemperament (e)} className='listAlpha'>
            
            <option value='Temps'>Temperaments</option>
            {temperament.map((temp) => (
              <option key={temp} value={temp}>{temp}</option>
            ))};
          </select>
          
          <button onClick={handleRefresh} className='refresh'>
            Refresh
          </button>
        </div>

        <div className='positions'>
          {currentDog?.map((e) => {
          // console.log(e.temperaments)
            return (
              <Fragment>
                {
                  <Card 
                  key={e.id}
                  id={e.id}
                  name={e.name}
                  image={e.image}
                  temperament={e.temperament}
                  temperaments={e.temperaments}
                  height={e.height + 'cm'}
                  weight={e.weight + 'kg'}
                  minHeight={e.minHeight}
                  maxHeight={e.maxHeight}
                  minWeight={e.minWeight}
                  maxWeight={e.maxWeight}
                  createdAtDb={e.createdAtDb}
                  />
                }
              </Fragment>
            )
          })}
        </div>

        <Pagination 
          key='key'
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          pagination={pagination}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </div>
    }
    </>
  );
};