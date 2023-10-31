import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('male');

    const signup = async () => {
        if (!name) {
            alert('Name is required')
            return
        }
        if (!email) {
            alert('Email is required')
            return
        }
        if (!mobile) {
            alert('Mobile is required')
            return
        }
        if (!password) {
            alert('Password is required')
            return
        }
        if (!address) {
            alert('Address is required')
            return
        }
        const response = await axios.post("/signup",{
                name,
                email,
                mobile,
                password,
                address,
                gender
            });
            if(response?.data?.success){
                alert(response?.data?.message)
                window.location.href='/login'
            }
            else{
                alert(response?.data?.message)
            }
        // alert(response.data.message)

        // useEffect(()=>{

        // },[])
    }
    return (
        <>
            <form className='signup-container'>
                <div >
                    <h1 className='text-center'>Signup</h1>
                    <div>
                        <label htmlFor='name' className='lable-signup'>Name</label>
                        <div><input type='text' id='name' placeholder='Enter your Name' className='input-box' value={name} onChange={(e) => { setName(e.target.value) }} /></div>
                        <label htmlFor='email' className='lable-signup'>Email</label>
                        <div><input type='email' id='email' placeholder='Enter your Email' className='input-box' value={email} onChange={(e) => { setEmail(e.target.value) }} /></div>
                        <label htmlFor='password' className='lable-signup'>Password</label>
                        <div><input type='password' id='password' placeholder='Enter your Password' className='input-box' value={password} onChange={(e) => { setPassword(e.target.value) }} /></div>
                        <label htmlFor='mobile' className='lable-signup'>Mobile</label>
                        <div><input type='text' id='mobile' placeholder='Enter your mobile' className='input-box' value={mobile} onChange={(e) => { setMobile(e.target.value) }} /></div>
                        <label htmlFor='add' className='lable-signup'>Address</label>
                        <div><input type='text' id='add' placeholder='Enter your Address' className='input-box' value={address} onChange={(e) => { setAddress(e.target.value) }} /></div>
                    </div>
                    <div className='gender-container'>
                        <div><input type='radio' checked={gender === "male"} onClick={() => { setGender('male') }} id='male' name='gender' /></div>
                        <label htmlFor='male' className='lable-signup'>Male</label>
                        <div><input type='radio' checked={gender === "female"} onClick={() => { setGender('female') }} id='female' name='gender' /></div>
                        <label htmlFor='female' className='lable-signup'>Female</label>
                    </div>
                    <div>
                        <button type='button' className='btn btn-signup' onClick={signup}>Signup</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Signup;