import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../redux/actions/productActions';

const PrdouctScreen = (props) => {
    const productDetails = useSelector((state) => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();
    const idProduct = props.match.params.id;

    useEffect(() => {
        /**
         * Get product details
         */
        dispatch(detailsProduct(idProduct));
    }, []);

    return (
        <div>
            <div className="back-to-results">
                <Link to="/">Back to results</Link>
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <div className="details">
                    <div className="details-image">
                        <img src={product.image} alt="product" />
                    </div>
                    <div className="details-info">
                        <ul>
                            <li>
                                <h4>{product.name}</h4>
                            </li>
                            <li>
                                {product.rating} Start ({product.numReviews} Reviews)
                            </li>
                            <li>
                                Price: <b>${product.price}</b>
                            </li>
                            <li>
                                Description:
                                <div>{product.description}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="details-action">
                        <ul>
                            <li>Price: {product.price}</li>
                            <li>Status: {product.status}</li>
                            <li>
                                Qty:
                                <select>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </select>
                            </li>
                            <li>
                                <button className="button primary">Add to cart</button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PrdouctScreen;
