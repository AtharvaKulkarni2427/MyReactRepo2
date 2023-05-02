import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Checkout = () => {
  return (
   <>
   <div >

        <NavLink to="/checkout/summary"><button className='btn btn-primary'>Summary</button></NavLink>
        <NavLink to="/checkout/address"><button className='btn btn-primary'>Address</button></NavLink>
        <NavLink to="/checkout/payment"><button className='btn btn-primary'>Payment</button></NavLink>
   </div>
    <div >

        <Outlet/>
    </div>
   </>
  )
}

export default Checkout