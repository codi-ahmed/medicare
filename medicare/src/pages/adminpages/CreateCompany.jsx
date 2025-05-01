import React, { useState } from 'react';
import axios from 'axios';
import '../../style/addcompany.css';

const CreateCompany = () => {
  const [companyName, setCompanyName] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('company', companyName);
    formData.append('file', image);
    formData.append('userName', localStorage.getItem('adminName'));

    try {
      const res = await axios.post('http://localhost:3000/api/pharma/add', formData);
      setMessage(res.data.message);
      setCompanyName('');
      setImage(null);
      setPreviewUrl(null);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="add_company_body">
      <div className="form-section">
        <h2>Add A Company</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label>Company Name:</label><br />
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Company Logo:</label><br />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>
          <button type="submit">Add Company</button>
        </form>
      </div>

      <div className="preview-section">
        {previewUrl ? (
          <img  src={previewUrl} alt="Company Logo Preview" className="preview-img" />
        ) : (
          <p>No logo uploaded</p>
        )}
      </div>
    </div>
  );
};

export default CreateCompany;
