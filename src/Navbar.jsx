import axios from "axios";
import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";

const Navbar = (props) => {
  var isloggedin = useSelector((state) => state.isloggedin);
  var cartCount = useSelector((state) => state.cartCount);

  var [query, SetQuery] = useSearchParams();
  var [value, SetValue] = useState("");
  var dispatch = useDispatch();
  var navigate = useNavigate();
  const getText = (e) => {
    SetValue(e.target.value);
  };
  function search(e) {
    e.preventDefault();
    navigate(`/search?q=${value}`);
  }
  useEffect(() => {
    SetValue(query.get("q"));
  }, [query.get("q")]);

  useEffect(()=>{
    if(isloggedin){

      axios({
        method:"get",
        url:"http://localhost:80/api/cakecart",
        headers:{
          Authorization: localStorage.token
        }
      }).then((response)=>{
        dispatch({
          type: "CARTCOUNT",
          payload: response.data.data.length
      })
      })
    }
  },[isloggedin])

  const loggedout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
          BakeLicious
        </a>
        <div
          class="collapse navbar-collapse"
          id="navbarSupportedContent"
          style={{ display: "grid", justifyContent: "flex-end" }}>
          <ul
            class="navbar-nav mr-auto"
            style={{ display: "flex", margin: "10px" }}>
            <li
              class="nav-item active"
              style={{ margin: "auto", paddingLeft: "10rem" }}>
              <Link
                to="/"
                classname="nav-link"
                style={{ textDecoration: "none" }}>
                Home
              </Link>
            </li>
            <li
              class="nav-item"
              style={{ margin: "auto", paddingLeft: "2rem" }}>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                Sign up
              </Link>
            </li>
            <li
              class="nav-item"
              style={{ margin: "auto", paddingLeft: "2rem" }}>
              <Link to="/cart" style={{ textDecoration: "none" }}>
                <button type="button" class="btn btn-primary">
                  Cart <span class="badge badge-light">{cartCount}</span>
                </button>
              </Link>
            </li>
            <li
              class="nav-item"
              style={{ margin: "auto", paddingLeft: "2rem" }}>
              {!isloggedin && (
                <NavLink
                class="btn btn-primary"
                  to="/login"
                  style={{ padding: "1rem", textDecoration: "none" }}>
                     <button type="button" class="btn btn-primary">Login</button>
                </NavLink>
              )}
              {isloggedin && (
                <NavLink
                  onClick={loggedout}
                  class="btn btn-danger"
                  >
                   <button type="button" class="btn btn-danger">Logout</button>
                </NavLink>
              )}
            </li>
            <li
              className="nav-item"
              style={{ margin: "auto", paddingLeft: "2rem" }}>
              {/* <form class="form-inline my-2 my-lg-0"> */}
              <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={getText}
                value={value}
              />
            </li>
            <li>
              <button
                class="btn btn-outline-success my-2 my-sm-0"
                type="button"
                to="/search"
                onClick={search}>
                Search
              </button>
            </li>
            {/* </form> */}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
