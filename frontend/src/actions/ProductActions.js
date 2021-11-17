import axios from 'axios'
import { 
    ALL_PRODUCTS_REQUEST, 
    ALL_PRODUCTS_SUCCESS, 
    ALL_PRODUCTS_FAIL, 
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    CLEAR_ERRORS
   } 
   from '../constants/productConstants'

export const getProducts = (keyword = '', currentPage = 1, price, category, rating = 0 ) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCTS_REQUEST })
        let link = `/api/v1/products?page=${currentPage}&keyword=${keyword}&price[$lte]=${price[1]}&price[$gte]=${price[0]}&rating[$gte]=${rating}`;

        if(category) {
             link = `/api/v1/products?page=${currentPage}&keyword=${keyword}&price[$lte]=${price[1]}&price[$gte]=${price[0]}&category=${category}&rating[$gte]=${rating}`;
        }

        const { data } = await axios.get(link)
        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.errMessage
        })
    }
}
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQUEST })
        const { data } = await axios.get(`/api/v1/product/${id}`)
        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: data.product
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error.response.data.errMessage
        })
    }
}
// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS})
}