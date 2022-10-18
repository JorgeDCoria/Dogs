import {GET_DOGS, ERROR} from '../action';

const initialState = {
    dogs: [],
    detail:{},
    error:'',
}

const rootReducer = (state = initialState, action)=>{
    switch(action.type){
        case GET_DOGS:
            return {
                ...state, 
                dogs: action.payload};
        case ERROR:
            return {
                ...state, 
                error: action.payload};
        default:
            return state;
    }
}

export default rootReducer;