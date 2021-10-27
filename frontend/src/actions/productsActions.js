import axios from 'axios'
import { ALL_PRODUCTS_REQUEST, 
    ALL_PRODUCTS_SUCCESS, 
    ALL_PRODUCTS_FAIL, 
    CLEAR_ERORS
   } 
   from '../constants/productConstants'

export const getProducts = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCTS_REQUEST })
        const { data } = await axios.get('/api/v1/products')
        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}
// Clear Errors
export const clearError = () => async (dispatch) => {
    dispatch({type: CLEAR_ERORS})
}