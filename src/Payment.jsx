import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import "./payment.css"
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const Payment = () => {
    var setAddress = useSelector((state) => state.setAddress);
    var cartCount = useSelector((state) => state.cartCount);
    var finalAmount = useSelector((state) => state.finalAmount);

    var [cakes,setCakes] = useState([]);
    var dispatch = useDispatch();
    useEffect(()=>{
        axios({
            method: "get",
            url: `http://localhost:80/api/cakecart`,
            headers: {
                Authorization: localStorage.token
            }
        }).then((res) => {
            console.log("Response from api ", res.data);
            setCakes(res.data.data);  

        }, (error) => {
            console.log("Error in fetching details of cart ", error)
        })
    },[])

    const Confirm_Payment = (e)=>{
        e.preventDefault();
        axios({
            method:"post",
            url:`http://localhost:80/api/addcakeorder`,
            data:{
                cakes:cakes,
                name:setAddress?.name,
                address:setAddress?.address,
                city:setAddress?.city,
                pincode:setAddress?.pincode,
                phone:setAddress?.phone,
                price:finalAmount
            },
            headers: {
                Authorization: localStorage.token
            }
        }).then((res)=>{
            console.log("Response from api",res.data)
        },(error) => {
            console.log("Error in posting",error)
        })
       
    }

    useEffect(()=>{
        dispatch({
            type:"TOTAL_AMOUNT",
            payload:finalAmount
        })
    })

  return (
    <>
    <div>
        <div>
            <caption><h3>Details</h3></caption>
            <table style={{border:"2px solid black"}}>
                <tr>
                    <th>Name</th>
                    <td>{setAddress?.name}</td>
                </tr>
                <tr>
                    <th>Phone</th>
                    <td>{setAddress?.phone}</td>
                </tr>
                <tr>
                    <th>City</th>
                    <td>{setAddress?.city}</td>
                </tr>
                <tr>
                    <th>Pincode</th>
                    <td>{setAddress?.pincode}</td>
                </tr>
                <tr>
                    <th>Address</th>
                    <td>{setAddress?.address}</td>
                </tr>
            </table>
        </div>
        <div>
            <h5>Delivery Options</h5>
            <div className="card-body" >
                    <h5 className="card-title">No. Of Items:{cartCount}</h5>
                    <p className="card-text">You Have To Pay:{finalAmount}</p>
                    
                </div>
        </div>
        <div>
            <button className='btn btn-primary' type="button" onClick={Confirm_Payment} >Confirm Payment</button>
        </div>
    </div>
    </>
  )
}

export default Payment;