import axios from 'axios';
import EApi from '../../enums/api';
import { ADD_TO_CART, CART_REMOVE_ITEM } from '../constants/cartConstants';
import Cookie from 'js-cookie';

const PRODUCT_ID = ':productId:';

const addToCart = (productId, qty) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`${EApi.getProductDetails.replace(PRODUCT_ID, productId)}`);
        dispatch({
            type: ADD_TO_CART,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty,
            },
        });

        const {
            cart: { cartItems },
        } = getState();
        Cookie.set('cartItems', JSON.stringify(cartItems));
    } catch (error) {}
};

const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });
    const {
        cart: { cartItems },
    } = getState();
    Cookie.set('cartItems', JSON.stringify(cartItems));
};

export { addToCart, removeFromCart };
