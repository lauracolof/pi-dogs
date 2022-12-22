import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from '../components/Home/Home';
import Nav from '../components/NavBar/navBar';
import CardDetail from '../components/CardDetail/CardDetail';

export default function homeRouter() {
  return (
    <div>
      <Nav brand='HenryDogs' />
      <Routes>
        <Route exact path='/home' element={<Home />} />
        <Route path='/home/:id' element={<CardDetail />} />
      </Routes>
    </div>
  )
};