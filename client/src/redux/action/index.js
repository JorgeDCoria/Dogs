import axios from 'axios';
const URL = 'http://localhost:3001/';
export const GET_DOGS = 'GET_DOGS';
export const ERROR = 'ERROR';

export const getDogs = ()=> {
    return (dispatch)=>{
        axios.get(`${URL}dogs`)
        .then(response => dispatch({type:GET_DOGS, payload:response.data}))
        .catch((e)=>dispatch({type: ERROR, payload: e.message }));
    }
}