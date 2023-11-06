import React, { useState, useEffect } from "react";
import Header from './Header';
import { useUserContext } from "../context/userContext";
import ApiService from "./Api/ApiService";
import './Dashboard.css';

const apiService = new ApiService();

const Dashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await apiService.getPosts();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPosts();
  }, []);
  const { user } = useUserContext();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const userLocalStorageKey = `userData-${user.email}`;

  useEffect(() => {
    const userData = localStorage.getItem(userLocalStorageKey);
    if (userData) {
      setFormSubmitted(true);
    }
  }, [userLocalStorageKey]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = formData;

    localStorage.setItem(userLocalStorageKey, JSON.stringify(userData));

    setFormSubmitted(true);
  };

  const [isAddingPost, setAddingPost] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', body: '' });

  const toggleAddingPost = () => {
    setAddingPost(!isAddingPost);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({
      ...newPost,
      [name]: value,
    });
  };

  const handleAddPost = async () => {
    try {
      const newPostData = { title: newPost.title, body: newPost.body };
  
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPostData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add the new post');
      }
      const addedPost = await response.json();
  
      setPosts((prevPosts) => [...prevPosts, addedPost]);
  
      setNewPost({ title: '', body: '' });
  
      setAddingPost(false);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };
  

  return (
    <div>
      <Header />
      <h2>This user is Login {user.email}</h2>

      {formSubmitted ? (
          <div>
          <h2>Home</h2>
          <h3>All Latest Posts:</h3>
          <ul>
            {posts.map((post) => (
              <div className="card">
              
                <h1>{post.id}</h1>
                <h4>{post.title}</h4>
                <p>{post.body}</p>
              
              </div>
            ))}
          </ul>
          {isAddingPost ? (
            <div>
              <h3>Add New Post</h3>
              <form>
                <div className="form-container">
                <div>
                  <label>Title:</label><br />
                  <input
                    type="text"
                    name="title"
                    value={newPost.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Content:</label><br />
                  <input
                    type="text"
                    name="body"
                    value={newPost.body}
                    onChange={handleInputChange}
                  />
                </div>
                </div>
                <button type="button" onClick={handleAddPost}>
                  Add Post
                </button>
              </form>
            </div>
          ) : (
            <button onClick={toggleAddingPost}>Add Post Button</button>
          )}
        
        </div>
      ) : (
        <div>
          <h2>User Form</h2>
          <form onSubmit={handleSubmit}>
          <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
