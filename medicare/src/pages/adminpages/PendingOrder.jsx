import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../style/pendingorder.css';

const PendingOrder = () => {
  const [orders, setOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [orderStatuses, setOrderStatuses] = useState({});
  const [message, setMessage] = useState('');

  // Set default to today's date
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);

  // Fetch orders when date changes
  useEffect(() => {
    if (selectedDate) fetchOrdersByDate();
  }, [selectedDate]);

  const fetchOrdersByDate = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/order/getByDate/${selectedDate}`);
      setOrders(res.data.data);
      const initialStatuses = res.data.data.reduce((acc, order) => {
        acc[order._id] = order.status;
        return acc;
      }, {});
      setOrderStatuses(initialStatuses);
      setMessage('');
    } catch (error) {
      console.error('Error fetching orders', error);
      setOrders([]);
      setMessage('No orders found for the selected date.');
    }
  };

  const handleStatusChange = async (orderId) => {
    const newStatus = orderStatuses[orderId];
    if (newStatus) {
      try {
        await axios.patch(`http://localhost:3000/api/order/updateStatus/${orderId}`, { status: newStatus });
        setMessage('Order status updated successfully!');
        fetchOrdersByDate();
      } catch (error) {
        console.error('Error updating status', error);
        setMessage('Failed to update order status');
      }
    } else {
      setMessage('Please select a status to update');
    }
  };

  return (
    <div className="pending-order-container">
      <h2>📦 Pending Orders</h2>
    
      <div className="date-picker">
        <label htmlFor="date">Select Date:</label>
        <input 
          type="date" 
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)} 
        />
      </div>

      {message && <div className="message">{message}</div>}

      {orders.length === 0 ? (
        <p className="no-orders">No orders found for the selected date.</p>
      ) : (
        <div className="orders-container">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <h3>🧾 Order ID: {order._id}</h3>
              <p><strong>👤 Customer:</strong> {order.customer.name}</p>
              <p><strong>📦 Items:</strong> {order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}</p>
              <p><strong>💰 Total:</strong> {order.items.reduce((total, item) => total + item.price * item.quantity, 0)} Rs</p>

              <div className="status-update">
                <select
                  value={orderStatuses[order._id] || ''}
                  onChange={(e) =>
                    setOrderStatuses({ ...orderStatuses, [order._id]: e.target.value })
                  }
                >
                  <option value="">Change Status</option>
                  <option value="pending">Pending</option>
                  <option value="on the way">On the way</option>
                  <option value="delivered">Delivered</option>
                  <option value="returned">Returned</option>
                </select>
                <button onClick={() => handleStatusChange(order._id)}>Save</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingOrder;
