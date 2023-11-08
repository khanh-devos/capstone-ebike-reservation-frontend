// src/redux/actions/ebikeActions.js
import axios from 'axios';

export const addEbike = (ebikeData) => (dispatch) => {
  // You can perform asynchronous operations here, like your axios POST request
  axios.post('http://localhost:3100/api/v1/ebikes', ebikeData)
    .then((response) => {
      dispatch({ type: 'ADD_EBIKE_SUCCESS', payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: 'ADD_EBIKE_ERROR', payload: error });
    });
};

export default addEbike;
