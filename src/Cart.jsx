import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Cart = () => {
    var dispatch = useDispatch();
    var [cartCakes, setCartCakes] = useState([]);

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
        }, (error) => {
            console.log("Error in fetching details of cart ", error)
        })
    }, []);

    const removeCake = (index) => {
        const objCakeid = {
            cakeid: cartCakes[index].cakeid
        }
        console.log(objCakeid)
        axios({
            method: "post",
            url: `http://localhost:80/api/removecakefromcart`,
            data: objCakeid,
            headers: {
                Authorization: localStorage.token
            }
        }).then((res) => {
            cartCakes.splice(index, 1); 
            setCartCakes([...cartCakes]);
            dispatch({
                type: "CARTCOUNT",
                payload: cartCakes.length
            })

            console.log("Response from api ", res.data);
        }, (error) => {
            console.log("Error in removing cake in Cart", error);
        })
    }

    const increment = (index) => {
        cartCakes[index].quantity += 1
        setCartCakes([...cartCakes])
    }

    const decrement = (index) => {
        cartCakes[index].quantity -= 1
        setCartCakes([...cartCakes])
    }
    return (
        <div><br /><br />
            <h1 style={{ textAlign: "center" }} className='text-warning'>YOUR'S CART</h1>
            <table class="table" style={{ textAlign: "center" }}>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Image</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total Price</th>
                        <th scope="col">Action</th>
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
                                <td>
                                <button onClick={decrement.bind(null, index)} class="btn btn-dull">-</button>
                                {cake.quantity}
                                    <button onClick={increment.bind(null, index)} class="btn btn-dull">+</button>
                                   
                                   
                                </td>
                                <td>{cake.price * cake.quantity}</td>
                                <td><button className='btn btn-danger' onClick={removeCake.bind(null, index)}>Remove</button></td>
                            </tr>
                            
                        )
                    })}
                </tbody>
                            <tr>
                                <td> <NavLink to="/checkout"><button className='btn btn-warning'>Checkout</button></NavLink></td>
                            </tr>
            </table>
        </div>

    )
}

export default Cart