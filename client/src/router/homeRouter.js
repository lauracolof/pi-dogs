import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from '../components/Home/Home';
import NavBar from '../components/NavBar/NavBar';
import CardDetail from '../components/CardDetail/CardDetail';
import DogCreate from "../components/CreateDog/CreateDog";

export default function homeRouter() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route exact path='/home' element={<Home />} />
        <Route path='/home/:id' element={<CardDetail />} />
        <Route path='/dogs' element={<DogCreate />} />

      </Routes>
    </div>
  )
};