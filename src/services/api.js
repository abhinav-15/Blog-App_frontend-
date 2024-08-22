// src/services/api.js

import axios from 'axios';

const API_URL = 'https://blog-app-iota-silk.vercel.app//api/posts'; // Your backend API URL

// Fetch all posts
export const fetchPosts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts', error);
    throw error;
  }
};

// Fetch a single post by ID
export const fetchPostById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post', error);
    throw error;
  }
};
