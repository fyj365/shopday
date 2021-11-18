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
    UPDATE_PROFILE_RESET,

    CLEAR_ERRORS

} from '../constants/userConstants'
export const authReducer = (state = {user: {}}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST :
        case LOAD_USER_REQUEST: 
        case REGISTER_REQUEST :

            return {
                loading: true,
                isAuthenticated: false
            }
        case LOGIN_SUCCESS : 
        case LOAD_USER_SUCCESS:
        case REGISTER_SUCCESS : 

            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            }
        case LOGIN_FAIL : 
        case LOAD_USER_FAIL: 
        case REGISTER_FAIL : 

            return {
                loading: false, 
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case LOGOUT_FAIL: 
            return {
                ...state,
                error: action.payload
                
            }
        case CLEAR_ERRORS : 
            return {
                ...state,
                error: null
            }
        default :
            return state
    }
}

export const userReducer = (state =  {}, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST :
            return {
                loading: true,
                ...state
            }
        case UPDATE_PROFILE_SUCCESS : 
            return {
                loading: false,
                ...state,
                isUpdated: action.payload
            }
        case UPDATE_PROFILE_RESET: 
            return {
                ...state,
                isUpdated: false
            }
        case UPDATE_PROFILE_FAIL : 
            return {
                loading: false,
                ...state,
                error: action.payload
            }
        default: 
            return state
    }
}