import React from 'react';
import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    CLEAR_ERRORS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} from '../constants/productConstants';

export const productsReducer = (state= { products:[] }, action)=>{
    switch(action.type){

        case ALL_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: []
            }

        case ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productCount: action.payload.productCount
            }

        case ALL_PRODUCTS_FAIL:
            return {
                loading:false,
                error:action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }


        default:
            return state;

    }
}

//(state= { products:[] }, action)
export const productDetailsReducer = (state={product:{}}, action)=>{
    switch(action.type){

        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: true,
                product: action.payload
            }

        case PRODUCT_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }

        default:
            return state
    }


}