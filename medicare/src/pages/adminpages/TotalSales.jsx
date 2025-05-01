import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../style/totalsales.css'; 

const TotalSales = () => {
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/order/all');
        const orders = res.data;

        const thisMonth = new Date().getMonth();
        const thisYear = new Date().getFullYear();

        const filtered = orders.filter(order => {
          const date = new Date(order.createdAt);
          return (
            order.status === 'delivered' &&
            date.getMonth() === thisMonth &&
            date.getFullYear() === thisYear
          );
        });

        const total = filtered.reduce((sum, order) => {
          return sum + order.items.reduce((sub, item) => sub + item.price * item.quantity, 0);
        }, 0);

        setTotalSales(total);
      } catch (err) {
        console.error("Error fetching sales data:", err);
      }
    };

    fetchSales();
  }, []);

  return (
    <div className="sales-container">
      <h2>📈 Monthly Sales</h2>
      <div className="sales-card">
        <p className="amount">{totalSales.toFixed(2)}rs</p>
        <p className="note">Total Delivered Orders This Month</p>
      </div>
    </div>
  );
};

export default TotalSales;
