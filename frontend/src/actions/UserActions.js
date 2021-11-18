import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    CLEAR_ERRORS

} from '../constants/userConstants'
import axios from 'axios'
export const login = (email, password ) => async (dispatch) => {
    try {
        dispatch({type: LOGIN_REQUEST})
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        const { data } = await axios.post('/api/v1/login', { email, password }, config)
        dispatch({ type: LOGIN_SUCCESS, payload: data.user })

    } catch (error) {
        dispatch({type: LOGIN_FAIL, payload: error.response.data.errMessage})
    }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS})
}
// register user
export const register = (name, email, password) => async (dispatch) => {
    try{
        dispatch({type: REGISTER_REQUEST})
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        const { data } = await axios.post('/api/v1/register', { name, email, password }, config)
        dispatch({ type: REGISTER_SUCCESS, payload: data.user })
    }catch(error){
        dispatch({type: REGISTER_FAIL, payload: error.response.data.errMessage})
    }
}

// LOADUASER
export const loadUser = () => async (dispatch) => {
    try{
        dispatch({type: LOAD_USER_REQUEST})
        const { data } = await axios.get('/api/v1/me')
        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user })
    }catch(error){
        dispatch({type: LOAD_USER_FAIL, payload: error.response.data.errMessage})
    }
}

// Logout user
export const logout = () => async (dispatch) => {
    try{
        const { data } = await axios.get('/api/v1/logout')
        dispatch({ type: LOGOUT_SUCCESS, payload: data.user })
    }catch(error){
        dispatch({type: LOGOUT_FAIL, payload: error.response.data.errMessage})
    }
}
// update user profile
export const updateProfile = (name, email, password) => async (dispatch) => {
    try{
        dispatch({type: UPDATE_PROFILE_REQUEST})
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        const { data } = await axios.put('/api/v1/me/update', { name, email, password }, config)
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success })
    }catch(error){
        dispatch({type: UPDATE_PROFILE_FAIL, payload: error.response.data.errMessage})
    }
}

// update password
export const updatePassword = (oldPassword, newPassword) => async (dispatch) => {
    try{
        dispatch({type: UPDATE_PASSWORD_REQUEST})
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        const { data } = await axios.put('/api/v1/password/update', { oldPassword, newPassword }, config)
        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success })
    }catch(error){
        dispatch({type: UPDATE_PASSWORD_FAIL, payload: error.response.data.errMessage})
    }
}