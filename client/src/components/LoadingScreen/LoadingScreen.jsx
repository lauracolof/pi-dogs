import React from "react";
import Fou from '../img/loading.gif';
import './LoadingScreen.css';

export default function LoadingScreen ({setLoading}) {
  return (
    <>
      <div className='woorupape' />
        <div className='fouGif'>
          <img src={Fou} alt="" />
        </div>
        <div className='loadingTime'>
          {
            setTimeout(() => {
              setLoading(false);
            }, 2000)
          }
      </div>
    </>
  )
}