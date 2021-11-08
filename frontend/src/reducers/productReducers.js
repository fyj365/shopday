import { ALL_PRODUCTS_REQUEST, 
         ALL_PRODUCTS_SUCCESS, 
         ALL_PRODUCTS_FAIL, 
         PRODUCT_DETAIL_REQUEST,
         PRODUCT_DETAIL_SUCCESS,
         PRODUCT_DETAIL_FAIL,
         CLEAR_ERRORS
        } 
        from '../constants/productConstants'
export const productsReducer = (state =  { products:[] }, action) => {
    switch(action.type) {
        case ALL_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: []
            }
        case ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.totalProducts,
                resPerPage: action.payload.resPerPage

            }
        case ALL_PRODUCTS_FAIL: 
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS: {
            return {
                ...state,
                error: null
            }
        }
        default: 
            return state;
    }
}
export const productDetailsReducer = (state =  { product:{} }, action) => { 
    switch(action.type) {
        case PRODUCT_DETAIL_REQUEST: 
            return {
                ...state,
                loading: true
            }
        case PRODUCT_DETAIL_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }
        case PRODUCT_DETAIL_FAIL: 
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
       }
        default: 
             return state
    }
}
