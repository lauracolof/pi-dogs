import axios from 'axios';

export const GET_DOGS = 'GET_DOGS';
export const GET_DOGS_NAME = 'GET_DOGS_NAME';
export const GET_DOGS_TEMPERAMENT = 'GET_DOGS_TEMPERAMENT';
export const GET_DETAIL = 'GET_DETAIL';
export const ORDER_BY_WEIGHT = 'ORDER_BY_WEIGHT';
export const FILTER_BY_CREATED = 'FILTER_BY_CREATED';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const FILTER_DOGS_BY_TEMPERAMENT = 'FILTER_DOGS_BY_TEMPERAMENT';


export const getDogs = () => (dispatch) => {
  return fetch(`http://localhost:3001/dogs`)
    .then((response) => response.json())
    .then((json) => {
      dispatch({
        type: 'GET_DOGS',
        payload: json
      })
    })
};

export const getDogsName = (name) => (dispatch) => {
  return fetch(`http://localhost:3001/dogs?name=${name}`)
    .then((response) => response.json())
    .then((json) => {
      dispatch({
        type: 'GET_DOGS_NAME',
        payload: json
      })
    })
};

export const getDogTemperament = () => (dispatch) => {
  return fetch(`http://localhost:3001/temperaments`)
    .then((response) => response.json())
    .then((json) => {
      dispatch({
        type: 'GET_DOGS_TEMPERAMENT',
        payload: json
      })
    })
};

export const filterDogsByTemperament = (payload) => {
  return {
    type: 'FILTER_DOGS_BY_TEMPERAMENT',
    payload
  }
};

export const getDetail = (id) => (dispatch) => {
  return fetch(`http://localhost:3001/dogs/${id}`)
    .then((response) => response.json())
    .then((json) => {
      dispatch({
        type: 'GET_DETAIL',
        payload: json
      })
    })
};

export const postDog = (payload) => () => {
  return fetch(`http://localhost:3001/dogs`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  })
};

export const orderDogsByWeight = (payload) => {
  return {
    type: 'ORDER_BY_WEIGHT',
    payload
  }
};

export const filterDogsByCreated = (payload) => {
  return {
    type: 'FILTER_BY_CREATED',
    payload
  }
};

export const filterByName = (payload) => {
  return {
    type: 'ORDER_BY_NAME',
    payload
  }
};

