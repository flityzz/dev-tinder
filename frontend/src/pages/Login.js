import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import './Login.css';
import api from '../services/api';

export default function Login({history}) {

    const [userName, setUserName] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await api.post('/user', {
            username: userName,

        })

        const {_id} = response.data;

        history.push(`/user/${_id}`);
    }

    return (
        <div className="login-container">

            <form onSubmit={handleSubmit}>
                <img src={logo} alt="logo" />
                <input
                    placeholder="digite seu usuario no github"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>

        </div>
    );
}