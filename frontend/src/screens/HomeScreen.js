import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProduct } from '../redux/actions/productActions';

const HomeScreen = (props) => {
    const productList = useSelector((state) => state.productList);
    const { products, loading, error } = productList;
    const dispatch = useDispatch();

    useEffect(() => {
        /**
         * Get products
         */
        dispatch(listProduct());
    }, []);

    return loading ? (
        <div>loading...</div>
    ) : error ? (
        <div>{error}</div>
    ) : (
        <Fragment>
            <ul className="products">
                {products.map((product) => (
                    <li key={product._id}>
                        <div className="product">
                            <Link to={`/product/${product._id}`}>
                                <img className="product-image" src={product.image} alt="product" />
                            </Link>
                            <div className="product-name">
                                <Link to={`/product/${product._id}`}>{product.name}</Link>
                            </div>
                            <div className="product-brand">{product.brand}</div>
                            <div className="product-price">${product.price}</div>
                            <div className="product-rating">
                                {product.rating} Stars ({product.numReviews} reviews)
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </Fragment>
    );
};

export default HomeScreen;
