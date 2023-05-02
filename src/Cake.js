import React from "react";
import { Link } from "react-router-dom";

const CakeDemo = (props) => {
    return (
        <div className="col md-4" style={{display:"inline-block"}} >
            <div className="card" style={{ width: "18rem"}}>
               <Link to = {`/cakedetails/${props.cakeid}`}> <img
                    src={props.images}
                    className="card-img-top"
                    alt="Not Available"
                /></Link>
                <div className="card-body" >
                    <h5 className="card-title">{props.prices}</h5>
                    <p className="card-text">{props.names}</p>
                    
                </div>
            </div>
        </div>
    );
};

export default CakeDemo;
