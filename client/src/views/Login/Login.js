import React, { useEffect, useState } from 'react';
import './Login.css'
import Navbar from '../../components/Navbar/Navbar';
import showToast from 'crunchy-toast';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const login = async () => {
        const userdata = (
            {
                email,
                password
            })
        const response = await axios.post('/login', userdata)

        if (response?.data?.success) {
             localStorage.setItem("user", JSON.stringify(response?.data?.data));
             showToast('response?.data?.message', 'success', 4000);
            window.location.href = '/';
     }
    }
    useEffect(()=>{
        const userSto = JSON.parse(localStorage.getItem("user" || '{}'))
        if(userSto?.email){
            alert("you are alredy logged in!");
            window.location.href = "/";
        }
    },[])

    return (
        <>
            <Navbar />
            <form className='form-container margin-con' >
                <h1 className='text-center'>Login</h1>

                <label htmlFor='email' className='lable-font'>Email</label>
                <div><input type='email' id='email' placeholder='Enter your Email' className='input-box-login' value={email} onChange={(e) => { setEmail(e.target.value) }} /></div>
                <label htmlFor='password' className='lable-font'>Password</label>
                <div><input type='password' id='password' placeholder='Enter your Password' className='input-box-login' value={password} onChange={(e) => { setPassword(e.target.value) }} /></div>

                <div><button type='button' className='btn btn-login' onClick={login}>Login</button></div>
            </form>
        </>
    )
}

export default Login;