import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListView from './components/ListView';
import DetailView from './components/DetailView';
import Login from './components/Login';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';

function App() {
    const [token, setToken] = useState(null);
    return (
        <Router>
            <Routes>
                
            <Route path="/" element={<ListView token={token} />} />
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route path="/create" element={<CreatePost token={token} />} />
                <Route path="/posts/:id" element={<DetailView token={token} />} />
                <Route path="/posts/:id/edit" element={<EditPost token={token} />} />  {/* Route for editing */}
            </Routes>
        </Router>
    );
}

export default App;
