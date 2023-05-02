import React from 'react'
import CakeDemo from './Cake'

var cakeObj = [
    {
        image: "https://assets.winni.in/product/primary/2022/9/73519.jpeg?dpr=1&w=400",
        title: "Butter Scotch",
        descript: "Tasty Cake",
    },
    {
        image: "https://assets.winni.in/product/primary/2014/6/31204.jpeg?dpr=1&w=400",
        title: "Chocolate",
        descript: "Vary Tasty Cake",
    }
  ];

const CakeList = (props) => {
  return (
        <div >
            {props.cakes.map((obj)=>{
              return(
            <CakeDemo
            images = {obj.image}
            prices = {obj.price}
            names = {obj.name}
            cakeid = {obj.cakeid}
            />
              )
            })
            }
        </div>
    
  )
}
export default CakeList;