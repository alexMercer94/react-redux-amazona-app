import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import './App.css';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import PrdouctScreen from './screens/PrdouctScreen';
import ProductsScreen from './screens/ProductsScreen';
import RegiserScreen from './screens/RegisterScreen';
import SigninScreen from './screens/SigninScreen';

const App = () => {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const openMenu = () => {
        document.querySelector('.sidebar').classList.add('open');
    };

    const closeMenu = () => {
        document.querySelector('.sidebar').classList.remove('open');
    };

    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="header">
                    <div className="brand" onClick={openMenu}>
                        <button>&#9776;</button>
                        <Link to="/">amazona</Link>
                    </div>
                    <div className="header-links">
                        <a href="cart.html">Cart</a>
                        {userInfo ? <Link to="/profile">{userInfo.name}</Link> : <Link to="/signin">Signin</Link>}
                    </div>
                </header>
                <aside className="sidebar">
                    <h3>Shopping Categories</h3>
                    <button className="sidebar-close-button" onClick={closeMenu}>
                        x
                    </button>
                    <ul>
                        <li>
                            <a href="index.html">Pants</a>
                        </li>
                        <li>
                            <a href="index.html">Shorts</a>
                        </li>
                    </ul>
                </aside>

                <main className="main">
                    <div className="content">
                        <Route path="/products" component={ProductsScreen}></Route>
                        <Route path="/signin" component={SigninScreen}></Route>
                        <Route path="/register" component={RegiserScreen}></Route>
                        <Route path="/product/:id" component={PrdouctScreen}></Route>
                        <Route path="/cart/:id?" component={CartScreen}></Route>
                        <Route path="/" exact={true} component={HomeScreen}></Route>
                    </div>
                </main>
                <footer className="footer">All right reserved.</footer>
            </div>
        </BrowserRouter>
    );
};

export default App;
