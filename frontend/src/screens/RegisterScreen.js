import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../redux/actions/userActions';

const RegiserScreen = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const dispatch = useDispatch();

    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            props.history.push('/');
        }
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(name, email, password));
    };

    return (
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>Create Account</h2>
                    </li>
                    <li>{loading && <div>Loading...</div>}</li>
                    <li>{error && <div>{error}</div>}</li>
                    <li>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)}></input>
                    </li>
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
                        <label htmlFor="rePassword">Re-Enter Password</label>
                        <input
                            type="password"
                            id="rePassword"
                            name="rePassword"
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </li>
                    <li>
                        <button className="button primary" type="submit">
                            Register
                        </button>
                    </li>
                    <li>
                        Already have an account? <Link to="/signin">Sign-in</Link>{' '}
                    </li>
                </ul>
            </form>
        </div>
    );
};

export default RegiserScreen;
