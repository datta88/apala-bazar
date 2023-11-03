import React, { useState ,useEffect} from 'react';
import Navbar from '../../components/Navbar/Navbar';

function Myorder(){
    const [user,setUser] = useState({});

    useEffect(()=>{
        const userSto = JSON.parse(localStorage.getItem("user" || '{}'))
        if(userSto?.email){
            setUser(userSto);
        }
        else
        {
            alert("you are not Logged in!")
            window.location.href = "/login"
        }
    },[])



return(
    <>
    <Navbar/>
    <h1>My MyOrders</h1>
    </>
)
}
export default Myorder