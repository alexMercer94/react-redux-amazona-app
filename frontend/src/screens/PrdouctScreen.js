import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../redux/actions/productActions';

const PrdouctScreen = (props) => {
    const [qty, setQty] = useState(1);
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

    const handleAddToCart = () => {
        props.history.push(`/cart/${idProduct}?qty=${qty}`);
    };

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
                            <li>Status: {product.countInStock > 0 ? 'In stock.' : 'Unavailable.'}</li>
                            <li>
                                Qty:
                                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                    {[...Array(product.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                </select>
                            </li>
                            <li>
                                {product.countInStock > 0 && (
                                    <button className="button primary" onClick={handleAddToCart}>
                                        Add to cart
                                    </button>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PrdouctScreen;
