import axios from 'axios';
import { TokenExpiredError } from 'jsonwebtoken';
import EApi from '../../enums/api';
import {
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_SAVE_FAIL,
    PRODUCT_SAVE_REQUEST,
    PRODUCT_SAVE_SUCCESS,
} from '../constants/productConstants';

const PRODUCT_ID = ':productId:';

/**
 * Get products list
 */
const listProduct = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data } = await axios.get(EApi.getProducts);
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
};

/**
 * Create a new product
 * @param {*} product Product to save
 */
const saveProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
        const {
            userSignin: { userInfo },
        } = getState();
        const { data } = await axios.post(EApi.postCreateProduct, product, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_SAVE_FAIL, payload: TokenExpiredError.message });
    }
};

/**
 * Get product's details
 * @param {*} productId Product ID
 */
const detailsProduct = (productId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
        const { data } = await axios.get(`${EApi.getProductDetails.replace(PRODUCT_ID, productId)}`);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
    }
};

export { listProduct, detailsProduct, saveProduct };
