import React, { useEffect, useState , useRef} from 'react';
import axios from 'axios';
import CompanySlider from '../component/CompanySlider';
import '../style/Home.css';
import Product from '../pages/Product'

const Home = () => {
  const [companies, setCompanies] = useState([]);
  const pharmaRef = useRef(null);
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/pharma/get'); 
        setCompanies(res.data.data); 
      } catch (error) {
        console.error("Failed to fetch companies", error);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    const handleScrollToPharma = () => {
      const hash = window.location.hash;
      if (hash === "#pharma-section" && pharmaRef.current) {
        pharmaRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    handleScrollToPharma();
    window.addEventListener("hashchange", handleScrollToPharma);
    return () => window.removeEventListener("hashchange", handleScrollToPharma);
  }, []);

  return (
    <div className='home_body'>
      <div className="banner_section">
        <img src="../../public/Banner.png" alt="Company Banner" className='banner_img_home' />
      </div>

      <div className="company_section" id='pharma-section'>
       <h1>Pharmaceutical Companies</h1>
        {companies.length > 0 ? (
          <CompanySlider companies={companies} />
        ) : (
          <p>Loading companies...</p>
        )}
    
      </div>
      <div className="product_section" id='product'>
        <Product />
      </div>
        <div className="anoucement_container">
          <div className="first_section">
            <div className="icon_div"><i class="fas fa-undo"></i></div>
            <div className="info_section">
              <h5>FREE RETURN</h5>
              <p>On spot Money back guarantee</p>
            </div>
            
          
          </div>
          <div className="second_section">
          <div className="icon_div"><i class="fas fa-truck"></i></div>
          <div className="info_section">
            <h5>FREE SHIPING</h5>
            <p>Free shipping on all order</p>
          </div>
            
          </div>
          <div className="third_section">
          <div className="icon_div"><i class="fas fa-phone"></i></div>
          <div className="info_section">
            <h5>SUPPORT 24/7</h5>
            <p>We support online 24 hour a day</p>
          </div>
          </div>
        </div>
    </div>
  );
};

export default Home;
