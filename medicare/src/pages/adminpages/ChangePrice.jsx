import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../style/changeprice.css'

const ChangePrice = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [previousPrice, setPreviousPrice] = useState('');
  const [newPrice, setNewPrice] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get('http://localhost:3000/api/product/get');
      setProducts(res.data.data);
    };
    fetchProducts();
  }, []);

  const handleProductSelect = (e) => {
    const selectedId = e.target.value;
    setSelectedProductId(selectedId);

    const selectedProduct = products.find(p => p._id === selectedId);
    if (selectedProduct) {
      setPreviousPrice(selectedProduct.price);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.put('http://localhost:3000/api/product/update-price', {
        productId: selectedProductId,
        newPrice,
      });

      alert(res.data.message);
      setPreviousPrice(newPrice); 
      setNewPrice('');
    } catch (error) {
      alert(`Failed to update error: ${error}`);
    }
  };

  return (
    <div className='change-price-body'>
      <h1>Change Item Price</h1>
      
      <div className="selection-section">
        <select value={selectedProductId} onChange={handleProductSelect}>
          <option value="">-- Select Product --</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>{p.name}</option>
          ))}
        </select>
      </div>

      {selectedProductId && (
        <div className="change-section">
          <div className="previous-price">
            <h5>Previous Price: {previousPrice}rs</h5>
          </div>
          <div className="change-price-input">
            <input
              type="number"
              placeholder="New Price"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
          </div>
          <button onClick={handleSubmit}>Update Price</button>
        </div>
      )}
    </div>
  );
};

export default ChangePrice;
