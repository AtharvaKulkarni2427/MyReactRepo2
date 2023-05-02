import React, { useState,useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import CakeList from './CakeList';
import axios from 'axios';
import LoadingPage from './LoadingPage';
const Search = () => {

    <LoadingPage/>

    var [searchitem,setSearchItem] =useState();
    var [query,SetQuery] = useSearchParams();
    var [result,SetResults] = useState([]);
    useEffect(()=>{
        setSearchItem(query.get("q"));
        axios({
          method:"get",
          url:`http://localhost:80/api/searchcakes?q=${query.get("q")}`
        }).then((response)=>{
          SetResults(response.data.data)
        })
    },[query.get("q")])



  return (
    <div>
      <h1>Result found:{result.length}</h1>
    <CakeList cakes={result}/>
    </div>
  )
}

export default Search