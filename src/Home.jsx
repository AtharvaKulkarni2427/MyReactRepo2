import React from "react";
import CakeDemo from "./Cake";
import Carousel from 'react-bootstrap/Carousel';
import CakeList from "./CakeList";
import axios from "axios"
import { useEffect ,useState} from "react";
import LoadingPage from "./LoadingPage";



const HomeDemo = () => {

  var [cakeData,setCakesData] = useState([]);
  var [ loading, setLoading] = useState(false);
  useEffect(()=>{
   
    axios({
      method:"get",
      url:"https://king-prawn-app-ef2xc.ondigitalocean.app/api/allcakes"
    }).then((response)=>{
      setCakesData(response.data.data);
      setLoading(true);
      console.log("The data fetched is ",response.data)
    },(error)=>{
      console.log("The error is ", error)
    },[])
})
    return (
        <div >

<Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1542826438-bd32f43d626f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt="First slide"
          style={{height: "90vh"}}
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://media.istockphoto.com/id/1329587431/photo/image-of-sliced-black-forest-gateau-on-cake-stand-with-grey-muslin-piped-whipped-cream.jpg?b=1&s=170667a&w=0&k=20&c=ex8F4TR2JFBr7JsPiQKOuxOf7d7C_sTxHiRsGDhx_qo="
          alt="Second slide"
          style={{height: "90vh"}}
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://media.istockphoto.com/id/1428104929/photo/gold-star-candle-on-vanilla-cupcake.jpg?b=1&s=170667a&w=0&k=20&c=ar4Xrre7x-lUrWHniCL03ReeYqaCsnTLD9fSzzHixYs="
          alt="Third slide"
          style={{height: "90vh"}}
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    {
      loading?(
        <CakeList cakes={cakeData}/>
        
      ):<LoadingPage/>
    }
        </div>
    );
};

export default HomeDemo;
