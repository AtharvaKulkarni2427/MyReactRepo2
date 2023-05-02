import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import LoadingPage from "./LoadingPage";

const Login = () => {
  const [errorE, setErrorE] = useState();
  const [errorP, setErrorP] = useState();
var [ loading, setLoading] = useState(false);
  var dispatch = useDispatch();

  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email,  password } = user;

  const [status, setStatus] = useState(false);

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    if (status === true) {
      if (e.target.name === "email") {
        if (!e.target.value) {
          setErrorE("Email is Required!");
        } else {
          setErrorE(null);
        }
      }

      if (e.target.name === "password") {
        if (!e.target.value) {
          setErrorP("Password is required!");
        } else {
          setErrorP(null);
        }
      }
    //   if (e.target.name === "name") {
    //     if (!e.target.value) {
    //       setErrorU("name is Required!");
    //     } else {
    //       setErrorU(null);
    //     }
    //   }
    }
  };

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(true);
    },1000)
  },[])

  const signup = () => {
    // setLoading("Loading");
    axios({
      method: "post",
      url: "http://localhost:80/api/login",
      data: user,
    }).then(
      (response) => {
        setStatus(true);
        
        
        if(response.data.token){
          localStorage.setItem("token",response.data.token);
          dispatch({
            type:"LOGIN"
          })
         
          navigate("/")
        }else{
          alert("Invalid Credentials")
        }
        console.log("The data fetched is ", response.data);
        setUser({
          email: null,
          password: null,
        });
        
      },
      (error) => {
        console.log("The error is ", error);
      },
      []
    );
    if (email === "") {
      setErrorE("Email is required!");
    } else if (email !== "") {
      setErrorE(null);
    }
    //------------------------------------
    if (password === "") {
      setErrorP("Password is required!");
    } else if (password !== "") {
      setErrorP(null);
    }
    //------------------------------------
    // if (name === "") {
    //   setErrorU("name is required!");
    // } else if (name !== "") {
    //   setErrorU(null);
    // }
  };
    return (
      <div>
      {
        loading?(
        <div>
          <br />
          <table>
            <tr>
              <td>
                <label>Email: </label>
              </td>
              <td>
                <input name="email" type="email" onChange={onInputChange} />
              </td>
              <td>
                <span style={{ color: "red" }}>{errorE}</span>
              </td>
            </tr>
            <tr>
              <td>
                <label>Password: </label>
              </td>
              <td>
                <input
                  name="password"
                  type="password"
                  onChange={onInputChange}
                />
              </td>
              <td>
                <span style={{ color: "red" }}>{errorP}</span>{" "}
              </td>
              {/* <span>{loading}</span> */}
            </tr>
            <br />
          </table>
          <div style={{ marginLeft: "100px" }}>
            <button className="btn btn-info" onClick={signup} type="button">
              Submit
            </button>
          </div>
        </div>
        ):<LoadingPage/>
    }
      </div>
    );
  };

export default Login;
