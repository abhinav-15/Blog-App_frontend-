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
      
      {/* Sidebar */}
      <aside className="sidebar">
        <nav>
          <ul>
            <li><Link to="/" className="active"><i className="home-icon"></i> Home</Link></li>
            <li><Link to="/resources"><i className="resources-icon"></i> Resources</Link></li>
            <li><Link to="/posts"><i className="posts-icon"></i> Posts</Link></li>
            <li><Link to="/settings"><i className="settings-icon"></i> Settings</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="content">
        <header className="list-header">
          <h1 className="list-header3">Blog Posts</h1>
          {!token ? (
            <Link to="/login" className="login-button">Login</Link>
          ) : (
            <Link to="/create" className="create-post-button">Create Post</Link>
          )}
        </header>

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
