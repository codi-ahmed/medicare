import React from 'react'
import { Link } from 'react-router-dom';
import '../style/footer.css'
const Footer = () => {
  return (

    <div id="about" className="footer_container">
      <div className="footer_main">
        <div className="footer_company_section">
          <h2>Company Details</h2>
          <div className="footer_company_detail"><p>At medicare, we take pride in being a leading wholesale distributor, 
            committed to providing businesses with a broad selection of high-quality products at unbeatable prices. Our
             extensive network and strong supplier relationships allow us to offer exclusive bulk discounts, ensuring you
              get the best value for your investment. Whether you're stocking up for retail, e-commerce, or large-scale
               operations, we are dedicated to meeting your needs with fast delivery, exceptional customer support, and 
               customized wholesale solutions. Partner with us and experience the advantage of quality, affordability, and
                trusted service all in one place.</p></div>
          <div className="footer_company_social">
            <a href="/"><i class="fab fa-facebook-f"></i></a>
            <a href="/"><i class="fab fa-dribbble"></i></a>
            <a href="/"><i class="fab fa-twitter"></i></a>
            <a href="/"><i class="fab fa-google-plus-g"></i></a>
          </div>
        </div>
        <div className="footer_info_section">
        <h2>Search Something</h2>
        <div className="footer_info_search">
          <input type="text" id='search_info'  placeholder='Search'/>
        </div>
        <div className="footer_info_information">
          <div className='info_information'><i class="fas fa-home"></i><p>Rahim Yar Khan 64200, pk</p></div>
          <div className='info_information'><i class="fas fa-envelope"></i><p>info@medicare.com</p></div>
          <div className='info_information'><i class="fas fa-phone"></i><p>+92 326 0912324</p></div>
          <div className='info_information'><i class="fas fa-print"></i><p>(068)- 0912324</p></div>
        </div>
        </div>
        <div className="footer_link_section">
          <h2>Our Website</h2>
          <br />
          <div className="footer_link"><Link to="/" className="footer-link">Home</Link></div>
          <div className="footer_link"><Link to="/pharma" className="footer-link">Products</Link></div>
          <div className="footer_link"><a href='/' className="footer-link">Pharma</a></div>
          <div className="footer_link"><Link to="/contact" className="footer-link">Contact</Link></div>
          <div className="footer_link"><a href='/' className="footer-link">About</a></div>
          <div className="footer_link"><Link to="/cart" className="footer-link">Add to Cart</Link></div>
          <div className="footer_link"><Link to="/admin" className="footer-link">Admin</Link></div>
        </div>
      </div>
      <div className="footer_base">
      © 2025 Copyright: <a href="/">medicare.com</a>
      </div>
    </div>

  )
}

export default Footer
