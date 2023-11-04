import React, { useEffect, useState } from "react";
import './Home.css';
import Navbar from "../../components/Navbar/Navbar";
import ProductCard from "../../components/ProductCard/ProductCard";
import axios from 'axios';

function Home() {
    const [product, setProduct] = useState([])
    const [search , setSearch] = useState('')

    const searchProduct = async ()=>{
        if(search === ''){
            loadProduct()
            return;
        }

        const responce = await axios.get(`/searchProduct?q=${search}`);
        setProduct(responce?.data?.data)
    }

    useEffect(()=>{
        searchProduct()
    },[search])

    const loadProduct = async () => {
        const responce = await axios.get('/products');
        try {
            setProduct(responce?.data?.data);
        }
        catch {
            alert(responce?.data?.message);
        }

    }

    useEffect(() => {
        loadProduct()
    }, [])
    return (
        <>
            <Navbar />
           
            <input type="text" value={search}
            onChange={((e)=>{
                setSearch(e.target.value)
            })}
            placeholder="Search" className="home-input-search" />

            <div className="home-product-card">
                {
                    product?.map((product, i) => {
                        const { _id ,name, description, price, image } = product;
                        return (<ProductCard key={i} id={_id} name={name} description={description} price={price} image={image} />)
                    })
                }
            </div>
        </>
    )
}
export default Home