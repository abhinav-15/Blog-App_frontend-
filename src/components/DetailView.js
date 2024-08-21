import React, { useEffect, useState } from 'react';
import { fetchPostById } from '../services/api';
import { useParams, Link } from 'react-router-dom';
import './DetailView.css';

const DetailView = ({ token }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        const post = await fetchPostById(id);
        setPost(post);
      } catch (error) {
        console.error('Failed to fetch post', error);
      }
    };
    getPost();
  }, [id]);

  if (!post) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="detail-container">
      
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
        <header className="detail-header">
          <h1 className="detail-header3">Blog Detail</h1>
          {!token ? (
            <Link to="/login" className="login-button">Login</Link>
          ) : (
            <Link to="/create" className="create-post-button">Create Post</Link>
          )}
        </header>

        <div className="post-detail">
          <h2 className="detail-title">{post.title}</h2>
          <p className="detail-content">{post.content}</p>
          {token && (
            <Link to={`/posts/${id}/edit`} className="edit-button">Edit Post</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailView;
