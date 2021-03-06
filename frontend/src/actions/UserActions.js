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
    CLEAR_ERRORS,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,

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
export const register = (name, email, password, avatar) => async (dispatch) => {
    try{
        dispatch({type: REGISTER_REQUEST})
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        const { data } = await axios.post('/api/v1/register', { name, email, password, avatar }, config)
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
        dispatch({type: LOAD_USER_FAIL, payload: error.message})
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
export const updateProfile = (name, email, avatar) => async (dispatch) => {
    try{
        dispatch({type: UPDATE_PROFILE_REQUEST})
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        const { data } = await axios.put('/api/v1/me/update', { name, email, avatar }, config)
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
// update password
export const forgetPassword = (email) => async (dispatch) => {
    try{
        dispatch({type: FORGOT_PASSWORD_REQUEST})
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        const { data } = await axios.post('/api/v1/password/forget', { email}, config)
        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data })
    }catch(error){
        dispatch({type: FORGOT_PASSWORD_FAIL, payload: error.response.data.errMessage})
    }
}

// reset password
export const resetPassword = (resetToken, password, confirmPassword) => async (dispatch) => {
    try{
        dispatch({type: NEW_PASSWORD_REQUEST})
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/password/reset/${resetToken}`, { password, confirmPassword}, config)
        dispatch({ type: NEW_PASSWORD_SUCCESS, payload: data })
    }catch(error){
        dispatch({type: NEW_PASSWORD_FAIL, payload: error.response.data.errMessage})
    }
}