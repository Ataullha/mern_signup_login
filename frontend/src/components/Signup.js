import React, { useState } from 'react'
import axios from 'axios'

const Signup = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [account_number, setAccount_number] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/signup', {
                username,
                email,
                password,
                account_number
            });

            console.log(response.data); // Handle the response from the server
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className='form-container'>
            <h2>Signup</h2>
            <br />
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    type='text'
                    placeholder='Rahim'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Email</label>
                <input
                    type='email'
                    placeholder='rahim@gmail.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input
                    type='password'
                    placeholder='Create Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label>Account Number</label>
                <input
                    type='text'
                    placeholder='2018331081'
                    value={account_number}
                    onChange={(e) => setAccount_number(e.target.value)}
                />
                <br />
                <button type='submit'>Signup</button>
            </form>
        </div>
    )
}

export default Signup