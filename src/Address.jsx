import React from "react";
import "./address.css"
import { NavLink, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";

const Address = () => {

    var dispatch = useDispatch();
    var Navigate = useNavigate();
    var [details,setDetails] = useState({
        name:"",
        address:"",
        city:"",
        pincode:"",
        phone:""
    })

    var {name,address,city,pincode,phone} = details;

    const AddAddress =(e) =>{
        e.preventDefault();
        dispatch({
            type: "SET_ADDRESS",
            payload: details
        })
        Navigate("/checkout/payment")
        // console.log("object",details)
    }

    const OnInputChange =(e) =>{
        setDetails({...details , [e.target.name]: e.target.value})
    }

  return (
    <>
        <div class="row mt-3 mx-3" style={{marginTop:"25px "}}>
  <div class="col-md-9 justify-content-center">
    <div class="card card-custom pb-4">
      <div class="card-body mt-0 mx-5">
        <div class="text-center mb-3 pb-2 mt-3">
          <h4 style={{color: "#495057"}}>Delivery Details</h4>
        </div>

        <form class="mb-0">

          <div class="row mb-4">
            <div class="col">
              <div class="form-outline">
                <input type="text" id="form9Example1" class="form-control input-custom" name="name" value={name} onChange={OnInputChange}/>
                <label class="form-label" for="form9Example1"> Name</label>
              </div>
            </div>
            <div class="col">
              <div class="form-outline">
                <input type="number" id="form9Example2" class="form-control input-custom"  name="phone" value={phone} onChange={OnInputChange}/>
                <label class="form-label" for="form9Example2">Phone Number</label>
              </div>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col">
              <div class="form-outline">
                <input type="text" id="form9Example3" class="form-control input-custom"  name="city" value={city} onChange={OnInputChange}/>
                <label class="form-label" for="form9Example3">City</label>
              </div>
            </div>
            <div class="col">
              <div class="form-outline">
                <input type="number" id="form9Example4" class="form-control input-custom"  name="pincode" value={pincode} onChange={OnInputChange}/>
                <label class="form-label" for="form9Example4">Pin Code</label>
              </div>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col">
              <div class="form-outline">
                <input type="text" id="form9Example6" class="form-control input-custom"  name="address" value={address} onChange={OnInputChange}/>
                <label class="form-label" for="form9Example6">Address</label>
              </div>
            </div>
            {/* <div class="col">
              <div class="form-outline">
                <input type="email" id="typeEmail" class="form-control input-custom" />
                <label class="form-label" for="typeEmail">Email</label>
              </div>
            </div> */}
          </div>

          <div class="float-end ">
            <NavLink to="/checkout/payment">
            <button type="button" class="btn btn-primary btn-rounded"
              style={{backgroundColor: "#0062CC"}} onClick={AddAddress}>Add Address</button>
              </NavLink>
          </div>

        </form>
      </div>
    </div>
  </div>
</div>
</>
  );
};

export default Address;
