import React from "react";
import { Route, Routes } from 'react-router-dom';
import LandingPage from '../components/LandingPage/LandingPage';
import './app.css';
import HomeRouter from "./homeRouter";
import DogCreate from '../components/CreateDog/CreateDog';

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route path='/dog' element={<DogCreate />} />
        <Route path='/*' element={<HomeRouter />} />
      </Routes>
    </>
  )
};

export default App;