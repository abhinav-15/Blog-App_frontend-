// src/components/EditPost.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditPost.css';

const EditPost = ({ token }) => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`blog-app-frontend-vert.vercel.app/posts/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error('Failed to fetch post', error);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://blog-app-iota-silk.vercel.app//api/posts/${id}`, { title, content }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(`/`); // Redirect back to detail view after editing
    } catch (error) {
      console.error('Failed to update post', error);
    }
  };

  return (
    <div className="edit-container">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
        />
        <button type="submit" className="save-button">Save Changes</button>
      </form>
    </div>
  );
};

export default EditPost;
