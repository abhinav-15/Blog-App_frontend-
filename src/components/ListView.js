import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../services/api';
import { Link } from 'react-router-dom';
import './ListView.css'; // Import the CSS file

const ListView = ({ token }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await fetchPosts();
        setPosts(posts);
      } catch (error) {
        console.error('Failed to fetch posts', error);
      }
    };
    getPosts();
  }, []);

  return (
    
    <div className="list-container">
    <header className="list-header">
    <h1 className="list-header3">Blog Posts</h1>
    {!token ? (
      <Link to="/login" className="login-button">Login</Link>
    ) : (
      <Link to="/create" className="create-post-button">Create Post</Link>
    )}
  </header>
  {/* Sidebar */}
  <aside className="sidebar">
    <nav>
      <ul>
        <li><Link to="/" className="active">Home</Link></li>
        <li><Link to="/resources">Resources</Link></li>
        <li><Link to="/posts">Posts</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </nav>
  </aside>

  {/* Main Content */}
  

  <div className="content">
    <div className="post-list">
      {posts.map(post => (
        <div key={post._id} className="post-card">
          <h3>{post.title}</h3>
          <p>{post.content.substring(0, 100)}...</p>
          <Link to={`/posts/${post._id}`} className="read-more">Read More</Link>
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default ListView;
