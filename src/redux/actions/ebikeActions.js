// src/redux/actions/ebikeActions.js
import axios from 'axios';

const addEbike = async (ebikeData, dispatch) => {
  try {
    const response = await axios.post('http://localhost:3100/api/v1/ebikes', ebikeData);
    dispatch({ type: 'ADD_EBIKE_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'ADD_EBIKE_FAILURE', error });
  }
};

export default addEbike;
