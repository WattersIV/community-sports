import { Carousel } from 'react-bootstrap';
import './CarouselComponent.scss';

export default function CarouselComponent(props) {

  return (
    <>
      <div className="overlay"><span>Join the locals for the games<br></br> you've always loved.</span></div>

      <Carousel controls={false} pause={false} interval={8000}>

        <Carousel.Item  >
          <div className="carousel-image1">

          </div>
        </Carousel.Item>
        <Carousel.Item  >
          <div className="carousel-image2">

          </div>
        </Carousel.Item>
        <Carousel.Item  >
          <div className="carousel-image3">

          </div>
        </Carousel.Item>

      </Carousel>
    </>
  )
} 