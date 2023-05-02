import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CakeList from "./CakeList";
import { NavLink } from "react-router-dom";
import LoadingPage from "./LoadingPage";

const CakeDetails = () => {
  var params = useParams();
  var cakeid = params.cakeid;
  var [cakeDetails, setCakedetails] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:80/api/cake/${cakeid}`,
    }).then(
      (response) => {
        console.log("data is ", response.data.data);
        setCakedetails(response.data.data);
      },
      (error) => {
        console.log("error in fetching detail");
      }
    );
  }, []);

  const AddToCart = () => {
    <LoadingPage />;
    const NewCake = {
      image: cakeDetails.image,
      weight: cakeDetails.weight,
      price: cakeDetails.price,
      name: cakeDetails.name,
      quantity: cakeDetails.quantity,
      cakeid: cakeid,
    };
    axios({
      method: "post",
      url: "http://localhost:80/api/addcaketocart",
      data: NewCake,
      headers: {
        Authorization: localStorage.token,
      },
    }).then((response) => {
      console.log("response added to api", response.data);
    });
  };
  return (
    <>
      {/* <div style={{width:"50%"}}>
            <img src={cakeDetails.image} alt="help me " />
        </div>
        <div style={{width:"50%"}}>
        <NavLink to="/cart"><input onClick={AddToCart} type="button" value="Add To Cart"/></NavLink>
        </div> */}
      <section class="vh-100 gradient-custom-2">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-10 col-lg-8 col-xl-6">
              <div class="card card-stepper" style={{ borderRadius: "16px" }}>
                <div class="card-header p-4">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <p class="text-muted mb-2">
                        {" "}
                        Order ID{" "}
                        <span class="fw-bold text-body">
                          {cakeDetails.cakeid}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="card-body p-4">
                  <div class="d-flex flex-row mb-4 pb-2">
                    <div class="flex-fill">
                      <h5 class="bold">{cakeDetails.name}</h5>
                      <p class="text-muted"> </p>
                      <h4 class="mb-3"> Price: {cakeDetails.price} </h4>
                      <h4 class="mb-3">Weight: {cakeDetails.weight} Kg </h4>
                    </div>
                    <div>
                      <img
                        class="align-self-center img-fluid"
                        src={cakeDetails.image}
                        width="250"
                      />
                    </div>
                  </div>
                </div>
                <div class="card-footer p-4">
                  <div class="d-flex justify-content-between">
                    <h5 class="fw-normal mb-0">
                      <NavLink
                        to={`/cart`}
                        onClick={AddToCart}
                        className="btn btn-success">
                        Add to cart
                      </NavLink>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CakeDetails;
