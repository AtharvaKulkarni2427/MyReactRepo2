import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Summary = () => {
    var dispatch = useDispatch();
    var [cartCakes, setCartCakes] = useState([]);
    var [Total,setTotal] = useState(0);

    useEffect(() => {
        axios({
            method: "get",
            url: `http://localhost:80/api/cakecart`,
            headers: {
                Authorization: localStorage.token
            }
        }).then((res) => {
            console.log("Response from api ", res.data);
            setCartCakes(res.data.data);  //set array of all add to cart
            dispatch({
                type: "CARTCOUNT",
                payload: res.data.data.length
            })

            res.data.data.forEach((cake)=> {
                setTotal((prev)=> prev += cake.price)
            })
        }, (error) => {
            console.log("Error in fetching details of cart ", error)
        })
    }, []);

    useEffect(()=>{
        dispatch({
            type:"TOTAL_AMOUNT",
            payload: Total
        })
    },[Total])


    return (
        <div><br /><br />
            <h1 style={{ textAlign: "center" }} className='text-warning'>Summary</h1>
            <table class="table" style={{ textAlign: "center" }}>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Image</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cartCakes?.map((cake, index) => {
                        return (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{cake.name}</td>
                                <td><img style={{ width: '2.5rem', height: '2.5rem' }} src={cake.image} alt='img' /></td>
                                <td>{cake.price}</td>
                                <td>{cake.quantity}</td>
                                <td>{cake.price * cake.quantity}</td>
                            </tr>
                            
                        )
                    })}
                </tbody>
                <tr>
                    <th>Total Amount:</th>
                    <td>{Total}</td>
                </tr>
            </table>
        </div>

    )
}

export default Summary;