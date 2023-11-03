import React from "react";
import './ProductCard.css';
import { Link } from "react-router-dom";

function ProductCard( {id,name, description, price, image}){
    return(
        <>
            <div className="product-card-container">
               <img src={image} className="product-image" />
               {/* <hr/> */}
                <h1 className="product-name">{name}</h1>
                <h3 className="product-des">{description}</h3>
                <p className="product-price">RS: ₹ {price}</p>

                <Link to={`/buy/${id}`}
                className="btn product-btn">Buy Now</Link>
            </div>
        </>
    )
}
export default ProductCard