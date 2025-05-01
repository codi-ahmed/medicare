import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/product.css';
import { useCart } from '../context/CartContext';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [addedMessage, setAddedMessage] = useState('');
  const itemsPerPage = 15;

  const { addToCart, cartItems } = useCart();  // Access the cartItems from context

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/product/get');
        setProducts(res.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handleNext = () => setCurrentPage(prev => prev + 1);
  const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const handleAddToCart = (product) => {
    // Check if the item is already in the cart and update if so
    const existingItem = cartItems.find(item => item._id === product._id);
    if (existingItem) {
      setAddedMessage(`${product.name} is already in the cart!`);
    } else {
      addToCart(product);
      setAddedMessage(`${product.name} added to cart!`);
    }

    // Hide the message after 2 seconds
    setTimeout(() => setAddedMessage(''), 2000);
  };

  return (
    <div className="product-container">
      <h2>Our Products</h2>

      {addedMessage && (
        <div className="item-added-message">{addedMessage}</div>
      )}

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="card-grid">
        {currentItems.map(product => (
          <div key={product._id} className="product-card">
            <h3>{product.name}</h3>
            <p>Size: {product.size}</p>
            <p>Price: {product.price}rs</p>
            <button
              onClick={() => handleAddToCart(product)}
            >
              Add Item
            </button>
          </div>
        ))}
      </div>

      <div className="pagination-controls">
        <button className='prev-next' onClick={handlePrev} disabled={currentPage === 1}>Previous</button>
        <span> Page {currentPage} </span>
        <button
          className='prev-next'
          onClick={handleNext}
          disabled={indexOfLastItem >= filteredProducts.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Product;
