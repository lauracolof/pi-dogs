import React from "react";
import Icon from '../img/loading.gif';
import './LoadingScreen.css';

export default function LoadingScreen ({setLoading}) {
  return (
    <>
      <div className='woorupape' />
        <div className='fouGif'>
          <img src={Icon} alt="" />
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