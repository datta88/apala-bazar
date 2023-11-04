import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './MyOrders.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

const STATUS_BADGE_COLOR_MAP = {
    "pending": "badge-danger",
    "shipped": "badge-warning",
    "delivered": "badge-success"
}

function Myorder() {
    const [user, setUser] = useState({});
    const [orders, setOrders] = useState([]);


    const localUser = JSON.parse(localStorage.getItem('user') || '{}')

    const loadData = async () => {
        // const UserId = user._id;
        // if(!UserId){
        //     return;
        // }
        const responce = await axios.get(`/userorder/${localUser?._id}`)
        setOrders(responce?.data?.data)
        console.log(localUser?._id);
    }

    useEffect(() => {
        loadData()
    }, [])



    useEffect(() => {
        const userSto = JSON.parse(localStorage.getItem("user" || '{}'))
        if (userSto?.email) {
            setUser(userSto);
        }
        else {
            alert("you are not Logged in!")
            window.location.href = "/login"
        }
    }, [])


    // user,product,id ,
    return (
        <>
            <Navbar />
            <h1 className='text-center'>My Orders</h1>
            <h1 className='text-center font-family1 order-id-container'>UserId : {user._id}</h1>

            {
                orders?.map((products, i) => {
                    const { product, deleveryCharges, quantity, status } = products;

                    return (
                        <>
                            <div className='myorder-box'>
                                <Link to={`/buy/${product._id}`} className='font-family1 link-container' > {product.name}</Link>
                                <h1 className='font-family1' >Delevery charges :{deleveryCharges}</h1>
                                <h1 className='font-family1' > quntity : {product.price} x {quantity}  = ₹ {quantity * product.price}</h1>
                                <h1 className='font-family1' >Price : {product.price}</h1>
                                <div className='order-status'>
                                    <h1 className={`font-family1 ${STATUS_BADGE_COLOR_MAP[status]}`} > { status}</h1>
                            </div>
                        </div >
                        </>
    )
})
            }
        </>
    )
}
export default Myorder