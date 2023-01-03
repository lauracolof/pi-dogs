import React from "react";
import './LandingPage.css';
import { Link } from 'react-router-dom';

export default function LandingPage () {
  return (
    <>
      <div className='background'>
        <div>
          <h1 className='welcomeText'>On good days, your doggo will be at your side to celebrate. <br/>
          And on bad days, he'll be right there too, steadfast in his loyalty <br/>and ready to play fetch as soon as you're back up and at 'em.</h1>
          <Link to={'/home'}>
            <span className='enterButton'>Enter</span>
          </Link>
        </div>
      </div>
    </>
  );
}