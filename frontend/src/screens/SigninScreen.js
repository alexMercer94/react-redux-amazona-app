import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../redux/actions/userActions';

const SigninScreen = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const userSignin = useSelector((state) => state.userSignin);
    const { loading, error, userInfo } = userSignin;

    useEffect(() => {
        if (userInfo) {
            props.history.push('/');
        }
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    };

    return (
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>Sign-In</h2>
                    </li>
                    <li>{loading && <div>Loading...</div>}</li>
                    <li>{error && <div>{error}</div>}</li>
                    <li>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                    </li>
                    <li>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </li>
                    <li>
                        <button className="button primary" type="submit">
                            Signin
                        </button>
                    </li>
                    <li>New to Amazona?</li>
                    <li>
                        <Link to="/register" className="button secondary text-center">
                            Create yout Amazona account
                        </Link>
                    </li>
                </ul>
            </form>
        </div>
    );
};

export default SigninScreen;
