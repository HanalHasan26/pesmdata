import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'

const Slider = () => {
  
  const [sliderPics,setSliderPics] = useState([])
  
 
  const getSlider= async()=>{
    const {data} = await axios.get('/api/admin');
    setSliderPics(data[0]);
  }
  

useEffect(()=>{
  getSlider()
})
  

  return (  
  

<Carousel fade>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={`${sliderPics.pic1}`}
      alt="First slide"
    >
    </img>


  </Carousel.Item>

  <Carousel.Item>

    <img
      className="d-block w-100"
      src={`${sliderPics.pic2}`}
      alt="Second slide"
    />


  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={`${sliderPics.pic3}`}
      alt="Third slide"
    />
  </Carousel.Item>
</Carousel>
  
    
  )
}

export default Slider