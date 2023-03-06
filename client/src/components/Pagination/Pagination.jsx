import React from "react";
import style from './Pagination.module.css';

export default function Pagination({dogsPerPage, allDogs, pagination, prevPage, nextPage, currentPage}) {
  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(allDogs/dogsPerPage); i++) {
    //              rounded. all the dogs divided by the dogs per page, increment i and push to pageNumbers
    pageNumbers.push(i);
  }

  return (
    <div className={style.Pagination_numbers}>
      <ul className={style.Pagination__ul}>
        {pageNumbers?.map((number) => {
          return (
            //loop for the pageNumbers
          <li key={number} className={style.list}>
            <button onClick={() => pagination(number)}>{number}</button>
          </li>)
          })}
      </ul>
      <button className={style.backButton} onClick={prevPage}>{'<<'}</button>
      <button className={style.advanceButton} onClick={nextPage}> {'>>'}</button>
    </div>
  );
}
