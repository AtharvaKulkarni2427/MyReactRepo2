import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Navbar from './Navbar';
import Search from './Search';
import SignUp from './SingUp';
import Login from './Login';
import CakeDetails from './CakeDetails';
import NotFound from './NotFound';
import { useState } from 'react';
import Cart from './Cart';
import Checkout from './Checkout';
import Address from './Address';
import Payment from './Payment';
import Summary from './Summary';


function App() {

  const [isloggedin, setIsLoggedin] = useState(localStorage.getItem('token') ? true : false);


  const loggedin = () => {
    setIsLoggedin(true);
}

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar isloggedin = {isloggedin}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path="/login" element={<Login loggedin ={loggedin}/>}/>
        <Route path='/cakedetails/:cakeid' element={<CakeDetails/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='*' element={<NotFound/>}/>
        <Route path='/checkout' element={<Checkout/>}>
          <Route path="/checkout/summary" element={<Summary/>}/>
          <Route path="/checkout/address" element={<Address/>}/>
          <Route path="/checkout/payment" element={<Payment/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
