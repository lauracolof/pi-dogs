import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from '../components/Home/Home';
import NavBar from '../components/NavBar/NavBar';
import CardDetail from '../components/CardDetail/CardDetail';

export default function homeRouter() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route exact path='/home' element={<Home />} />
        <Route path='/home/:id' element={<CardDetail />} />
      </Routes>
    </div>
  )
};