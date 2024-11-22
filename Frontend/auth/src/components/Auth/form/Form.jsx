import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Assuming you use react-router-dom for navigation

const Form = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    tags: '',
    author: '',
  });

  const [alert, setAlert] = useState({ message: '', type: '' }); // State to manage alert visibility
  const navigate = useNavigate(); // To programmatically navigate

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken'); // Get token from localStorage
    if (!token) {
      setAlert({ message: 'Please log in first!', type: 'danger' });
      navigate('/login'); // Redirect to login page
      return;
    }

    console.log('Token being sent:', token);

    try {
      const response = await axios.post(
        'http://localhost:3000/data/SaveLargeData', // Replace with your actual backend endpoint
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Data submitted successfully:', response.data);
      setAlert({ message: response.data.message || 'Data submitted successfully!', type: 'success' });
    } catch (error) {
      console.error('Error submitting data:', error.response || error.message);

      if (error.response) {
        const { status, data } = error.response;

        if (status === 401) {
          setAlert({ message: 'Error: Invalid or expired token. Please log in again.', type: 'danger' });
          localStorage.removeItem('authToken'); // Clear invalid token
          navigate('/login'); // Redirect to login page
        } else if (status === 400) {
          setAlert({ message: data.message || 'Bad request. Please check your input.', type: 'danger' });
        } else {
          setAlert({ message: data.message || 'An unexpected error occurred.', type: 'danger' });
        }
      } else {
        setAlert({ message: 'Network error. Please try again later.', type: 'danger' });
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Submit Large Data</h2>

      {/* Bootstrap Alert */}
      {alert.message && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          {alert.message}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="shadow-lg p-4 rounded">
        <div className="form-group mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="content" className="form-label">Content:</label>
          <textarea
            id="content"
            name="content"
            className="form-control"
            value={formData.content}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="tags" className="form-label">Tags:</label>
          <input
            type="text"
            id="tags"
            name="tags"
            className="form-control"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="author" className="form-label">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            className="form-control"
            value={formData.author}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">Submit</button>
      </form>
    </div>
  );
};

export default Form;
