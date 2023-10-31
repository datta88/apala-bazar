import React, { useState } from 'react';

function Login() {
    const [email, setEmail] =useState('');
    const [password,setPassword] = useState('');

    return (
        <>
            <form>
                <label htmlFor='email' className='lable-signup'>Email</label>
                <div><input type='email' id='email' placeholder='Enter your Email' className='input-box' value={email} onChange={(e) => { setEmail(e.target.value) }} /></div>
                <label htmlFor='password' className='lable-signup'>Password</label>
                <div><input type='password' id='password' placeholder='Enter your Password' className='input-box' value={password} onChange={(e) => { setPassword(e.target.value) }} /></div>
            </form>
        </>
    )
}

export default Login;