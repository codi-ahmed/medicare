import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../style/addproduct.css';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState('');
  const [productSize, setProductSize] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);



  const handleSubmit = async (e) => {
    e.preventDefault();

  
    try {
      const res = await axios.post('http://localhost:3000/api/product/add', {
        name: productName,
        type: productType,
        company,
        size: productSize,
        price: productPrice,
        quantity: productQuantity
      });
      alert(res.data.massage);
      setProductName('');
      setProductType('');
      setCompany('');
      setProductSize('');
      setProductPrice(0);
      setProductQuantity(0);
      

    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Something went wrong';
      alert(errorMsg);
    }

  }


  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/pharma/get_names');
        setCompanies(res.data.data);
      } catch (error) {
        console.error("Failed to fetch companies", error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className='add-product-body'>
      <div className="section_name"><h1>New Product</h1></div>
      <div className="form_section">
        <form action="submit" onSubmit={handleSubmit} className='form-section'>
          <div className="product_name">
            <h5>Name</h5>
            <input type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div className="product_type">
            <h5>Product Type</h5>
            <select value={productType} onChange={(e) => setProductType(e.target.value)}>
              <option value="">-- Select Type --</option>
              <option value="Tablets">Tablets</option>
              <option value="Syrup">Syrup</option>
              <option value="Milk">Milk</option>
              <option value="Sachet">Sachet</option>
              <option value="Lotion">Lotion</option>
              <option value="OralDrop">OralDrop</option>
              <option value="Injection">Injection</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="product_company">
            <h5>Pharmaceutical</h5>
            <select value={company} onChange={(e) => setCompany(e.target.value)}>
              <option value="">-- Select Company --</option>
              {companies.map((company, index) => (
                <option key={index} value={company.company}>{company.company}</option>
              ))}
            </select>
          </div>
          <div className="product_size">
            <h5>Pack Size</h5>
            <input type="text"
              value={productSize}
              onChange={(e) => setProductSize(e.target.value)}
              required
            />
          </div>
          <div className="product_price">
            <h5>Price</h5>
            <input type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />
          </div>
          <div className="product_quantity">
            <h5>Opening Quantity</h5>
            <input type="number"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
              required
            />
          </div>
          <div className="product-btn"><button type='submit'>Save</button></div>
        </form>
      </div>
    </div>
  )
}

export default AddProduct
