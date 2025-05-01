import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../style/changedetail.css';

const ChangeDetails = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [previousQuantity, setPreviousQuantity] = useState('');
  const [newQuantity, setNewQuantity] = useState('');

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
      setPreviousQuantity(selectedProduct.quantity);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.put('http://localhost:3000/api/product/update-quantity', {
        productId: selectedProductId,
        newQuantity,
      });

      alert(res.data.message);
      setPreviousQuantity(newQuantity); 
      setNewQuantity('');
    } catch (error) {
      alert(`Failed to update error: ${error}`);
    }
  };

  return (
    <div className='change-detail-body'>
      <h1>Change Item Stock</h1>
      
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
          <div className="quantity">
            <h5>Previous Quantity: {previousQuantity}</h5>
          </div>
          <div className="change-quantity">
            <input
              type="number"
              placeholder="New Quantity"
              value={newQuantity}
              onChange={(e) => setNewQuantity(e.target.value)}
            />
          </div>
          <button onClick={handleSubmit}>Update</button>
        </div>
      )}
    </div>
  );
};

export default ChangeDetails;
