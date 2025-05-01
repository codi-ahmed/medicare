import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import '../style/cart.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      setMessage("No items in cart");
      return;
    }

    try {
      const orderData = {
        customer: formData,
        items: cartItems,
        status: 'pending'
      };

      await axios.post('http://localhost:3000/api/order/create', orderData);

      // Display success message
      setMessage("Order placed successfully! You will be contacted soon");

      // Clear the cart from context and localStorage after the order is placed
      clearCart();  // Clear the cart using context method
    } catch (error) {
      console.error("Order failed:", error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {/* Show the success message only when the order is confirmed */}
      {message === "Order placed successfully! You will be contacted soon" ? (
        <div className="center-message success">{message}</div>
      ) : cartItems.length === 0 ? (
        <div className="center-message empty">No items selected</div>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map(item => (
              <div key={item._id} className="cart-item">
                <div>
                  <h3>{item.name}</h3>
                  <p>Size: {item.size}</p>
                  <p>Price: {item.price}rs</p>
                </div>
                <div>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                  />
                  <button onClick={() => removeFromCart(item._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <h3>Customer Info</h3>
          <form className="order-form" onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
            <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
            <button type="submit">Confirm Order</button>
          </form>

          {message && <p className="order-message">{message}</p>}
        </>
      )}
    </div>
  );
};

export default Cart;
