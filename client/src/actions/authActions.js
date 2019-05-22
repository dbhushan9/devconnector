import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {GET_ERRORS,SET_CURRENT_USER} from './types';
import setAuthToken from '../utils/setAuthToken';

// Register User
export const registerUser = (userData,history) => dispatch =>{
      axios
          .post('/api/users/register',userData)
          .then(res => history.push('/login'))
          .catch(err => 
                dispatch({
                    type: GET_ERRORS,
                    payload:err.response.data
                })
            )
}

// Login - Get User Token

export const loginUser = (userData) => dispatch =>{
    axios.post('/api/users/login',userData)
        .then(res =>{
            //save to local storage
            const { token } = res.data;
            //set token to ls
            localStorage.setItem('jwtToken',token);
            //set token to authorization header
            setAuthToken(token)
            //Decode Token to get User Data
            const decoded = jwt_decode(token);
            //set Current User
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload:err.response.data
                })
            )
}


export const setCurrentUser = (decoded)=>{
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}