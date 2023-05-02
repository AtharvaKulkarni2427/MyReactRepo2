import React from 'react'
import { useState ,useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router-dom';
import LoadingPage from './LoadingPage';


const SignUp = () => {
    const [errorE, setErrorE] = useState();
    const [errorP, setErrorP] = useState();
    const [errorU, setErrorU] = useState();
    const [loading,setLoading] = useState("");

    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const { email, name, password } = user;

    const [status, setStatus] = useState(false);


    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        if (status === true) {
            if (e.target.name === "email") {
                if (!e.target.value) {
                    setErrorE("Email is Required!");
                }
                else {
                    setErrorE(null);
                }
            }

            if (e.target.name === "password") {
                if (!e.target.value) {
                    setErrorP("Password is required!");
                }
                else {
                    setErrorP(null);
                }
            }
            if (e.target.name === "name") {
                if (!e.target.value) {
                    setErrorU("name is Required!");
                }
                else {
                    setErrorU(null);
                }
            }
        }
    }

    const signup = () => {
        // setLoading("Loading");
        <LoadingPage/>
        axios({
            method:"post",
            url:"http://localhost:80/api/register",
            data:user
          }).then((response)=>{
            setLoading("")
            console.log("The data fetched is ",response.data)
            Swal.fire("Congrats", "Your Are Registered", "success");
            navigate("/");
            setUser({
              email: null,
              name: null,
              password: null,
            });
          },(error)=>{
            console.log("The error is ", error)
          },[])

        setStatus(true);
        if (email === "") {
            setErrorE("Email is required!");
        }
        else if (email !== "") {
            setErrorE(null);
        }
        //------------------------------------
        if (password === "") {
            setErrorP("Password is required!");
        }
        else if (password !== "") {
            setErrorP(null);
        }
        //------------------------------------
        if (name === "") {
            setErrorU("name is required!");
        }
        else if (name !== "") {
            setErrorU(null);
        }
    }

    return (
        <div>
            <div><br />
                <table>
                    <tr>
                        <td><label>Email: </label></td>
                        <td><input name="email" type="email" onChange={onInputChange} /></td>
                        <td><span style={{ color: "red" }}>{errorE}</span></td>
                    </tr>
                    <tr>
                        <td><label>name: </label></td>
                        <td><input name="name" type="text" onChange={onInputChange} /></td>
                        <td><span style={{ color: "red" }}>{errorU}</span></td>
                    </tr>
                    <tr>
                        <td><label>Password: </label></td>
                        <td><input name="password" type="password" onChange={onInputChange} /></td>
                        <td><span style={{ color: "red" }}>{errorP}</span>  </td>
                        <span>{loading}</span>
                    </tr><br />
                </table>
                <div style={{marginLeft: "100px"}}>
                        <button className='btn btn-info' onClick={signup} type='button'>Submit</button>
                    </div>
            </div>
        </div>
    )
}

export default SignUp