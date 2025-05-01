import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../style/companyslider.css';

const CompanySlider = ({ companies }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      }
    ]
  };

  return (
    <div className="company_section">
      <Slider {...settings}>
        {companies.map((company, index) => (
          <div key={index} className="company_card">
            <img src={company.fileUrl} alt={company.company} />
            <p>{company.company}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CompanySlider;
