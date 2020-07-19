import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProduct, saveProduct } from '../redux/actions/productActions';

const ProductsScreen = (props) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, products, error } = productList;
    const productSave = useSelector((state) => state.productSave);
    const { loading: loadingSave, error: errroSave, success: successSave } = productSave;

    useEffect(() => {
        dispatch(listProduct());
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({ name, price, image, brand, category, countInStock, description }));
    };

    return (
        <Fragment>
            <div className="content content-margined">
                <div className="product-header">
                    <h3>Products</h3>
                    <button>Create Product</button>
                </div>

                <div className="form">
                    <form onSubmit={submitHandler}>
                        <ul className="form-container">
                            <li>
                                <h2>Create Product</h2>
                            </li>
                            <li>{loadingSave && <div>Loading...</div>}</li>
                            <li>{errroSave && <div>{errroSave}</div>}</li>
                            <li>
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={(e) => setName(e.target.value)}
                                ></input>
                            </li>
                            <li>
                                <label htmlFor="name">Price</label>
                                <input
                                    type="text"
                                    name="price"
                                    id="price"
                                    onChange={(e) => setPrice(e.target.value)}
                                ></input>
                            </li>
                            <li>
                                <label htmlFor="name">Image</label>
                                <input
                                    type="text"
                                    name="image"
                                    id="image"
                                    onChange={(e) => setImage(e.target.value)}
                                ></input>
                            </li>
                            <li>
                                <label htmlFor="name">Brand</label>
                                <input
                                    type="text"
                                    name="brand"
                                    id="brand"
                                    onChange={(e) => setBrand(e.target.value)}
                                ></input>
                            </li>
                            <li>
                                <label htmlFor="name">CounInStock</label>
                                <input
                                    type="text"
                                    name="counInStock"
                                    id="counInStock"
                                    onChange={(e) => setCountInStock(e.target.value)}
                                ></input>
                            </li>

                            <li>
                                <label htmlFor="name">Category</label>
                                <input
                                    type="text"
                                    name="catergory"
                                    id="category"
                                    onChange={(e) => setCategory(e.target.value)}
                                ></input>
                            </li>
                            <li>
                                <label htmlFor="name">Description</label>
                                <textarea
                                    name="description"
                                    id="description"
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </li>

                            <li>
                                <button className="button primary" type="submit">
                                    Create
                                </button>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>

            <div className="product-list">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
};

export default ProductsScreen;
