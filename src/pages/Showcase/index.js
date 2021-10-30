import Viewcard from "components/Viewcard";
import { showcase } from "data/showcaseData";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Showcase() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 15000,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          dots: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          infinite: true,
          dots: false
        }
      }
    ]
  };

  return (
    <section id="Showcase" className="section-block" title="Showcase">
      <h1>SHOWCASE</h1>
      <div className="viewcards-showcase">
        <Slider {...settings}>
          {showcase.map((c, i) => (
            <Viewcard key={i} {...c} />
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default Showcase;
