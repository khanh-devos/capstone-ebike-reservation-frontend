// ebikeActions.js
import axios from 'axios';

const addEbike = (ebikeData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3100/api/v1/ebikes', ebikeData);
    dispatch({ type: 'ADD_EBIKE_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'ADD_EBIKE_ERROR', payload: error });
  }
};

export default addEbike;
