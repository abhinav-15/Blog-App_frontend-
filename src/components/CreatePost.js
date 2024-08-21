// src/components/CreatePost.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css';  // Import the CSS file

const CreatePost = ({ token }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/posts', { title, content }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/'); // Redirect to homepage after creating a post
    } catch (error) {
      console.error('Failed to create post', error);
    }
  };

  return (
    <div className="create-post-container">
      <div className="create-post-box">
        <h2 className="create-post-title">Create a New Post</h2>
        <form onSubmit={handleSubmit} className="create-post-form">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="create-post-input"
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            className="create-post-textarea"
            required
          />
          <button type="submit" className="create-post-button">Create Post</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
