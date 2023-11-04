import './BuyPage.css';
import React, { useEffect, useState } from 'react';
import Navbar from './../../components/Navbar/Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function BuyPage() {

    const [pro, setPro] = useState({});
    const [address, setAddress] = useState('');
    const [quntity, setQuntity] = useState(1);
    const [charges, setCharges] = useState('50');

    const { id } = useParams();

    const loadProduct = async () => {
        const responce = await axios.get(`/product/${id}`);
        setPro(responce?.data?.data);
    }

    useEffect(() => {
        loadProduct();
    }, [])

    const incre = () => {
        setQuntity(quntity + 1);
    };

    const decre = () => {
        if (quntity === 1) {
            return
        }
        setQuntity(quntity - 1)
    };

    const userId = JSON.parse(localStorage.getItem('user') || '{}')

    const placeorder = async () => {
        const responceData = await axios.post('/order',
            {
                user: userId._id,
                product: id,
                deleveryCharges: charges,
                orderShippting: address,
                quantity: quntity
            }
        )
        if (responceData?.data?.success) {
            alert(responceData?.data?.message)
            window.location.href = '/myorder';
        }
        else (
            alert(responceData?.data?.message)
        )
    }

    return (
        <>
            <Navbar />
            <div className='buy-card-container'>
                <div>
                    <img src={pro.image} className='buy-img-container' />
                </div>

                <div className='buy-card-text-container'>
                    <h1 className='buy-font-size'>{pro.name}</h1>
                    <h1 className='buy-font-size'>brand : {pro.brand}</h1>
                    <h1 className='buy-font-size'>description :{pro.description}</h1>
                    <h1 className='buy-font-size'>Price :{pro.price}</h1>
                    <div className='quntity-container-buy'>
                        <h1 className='buy-font-size'>quntity :</h1>
                        <span className='span-buy' onClick={incre}>➕</span>
                        <p className='buy-font-size quntity-container'>{quntity}</p>
                        <span className='span-buy' onClick={decre}>➖</span>
                    </div>
                    <div className='radio-but-charges'>
                        <div className='input-container-buy'>
                            <h2 className='buy-font-size'><input type='radio' name='charges' checked={charges === '100'} onClick={() => { setCharges('100') }} /> fastest delevery</h2>
                        </div>
                        <div className='input-container-buy'>
                            <h2 className='buy-font-size'><input type='radio' name='charges' checked={charges === '50'} onClick={() => { setCharges('50') }} className='input-radio-button'/>reguler charges</h2>
                        </div>
                    </div>
                    <div className='quntity-container-buy-input'>
                        <div>
                            <h1>{address}</h1>
                            <input type='text'
                                value={address}
                                onChange={((e) => { setAddress(e.target.value) })}
                                placeholder='Enter your Address' className='buy-card-input-con' />
                        </div>
                        <div>
                            <button className='btn' onClick={placeorder}>place order</button>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}
export default BuyPage


