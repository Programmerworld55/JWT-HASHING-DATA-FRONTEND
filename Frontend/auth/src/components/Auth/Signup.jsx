import React, { useState } from 'react';
import axios from 'axios';
import { Form } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '', // Updated from "username" to "name"
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.password.length<8)
      {
        console.log(formData.password)
        setMessage("Password should be atleast 8 digits")
      }
      else
      {
        try {
          console.log("Data to send:", formData); // Ensure data is in the correct format
          const response = await axios.post('http://localhost:3000/auth/signup', formData);
          setMessage(response.data.message);
          setFormData({ name: '', email: '', password: '' });
        } catch (error) {
          
            
          setMessage(error.response?.data?.message || 'An error occurred');
    
            
        }
    
      }
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Signup</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
