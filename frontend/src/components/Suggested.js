import React, { useState, useEffect } from 'react';
import './Posts.css';

const Suggested = () => {
  const [suggested, setSuggested] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuggested = async () => {
      try {
        const response = await fetch('/posts.json');
        if (!response.ok) {
          throw new Error('Failed to fetch suggested posts');
        }
        const suggestedData = await response.json();
        if (Array.isArray(suggestedData)) {
          setSuggested(suggestedData.reverse());
        } else {
          throw new Error('Suggested data is not an array');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggested();
  }, []);

  if (loading) {
    return <div><p>Loading suggested users...</p></div>;
  }

  if (error) {
    return <div><p>Error: {error}</p></div>;
  }

  return (
    <div className="posts-container">
      {suggested.map((postUser) => (
        <div className="post-form" key={postUser.id}>
          <div className="post">
            <div className="user">
              <span>
                <img
                  className="user-avatar"
                  src={postUser.user}
                  alt="User Avatar"
                />
              </span>
              <p className="username">{postUser.username}</p>
            </div>

            <div className="card post-item">
              <div className="card-image">
                <img
                  className="post-image"
                  src={postUser.image}
                  alt={postUser.description || 'Suggested post'}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Suggested;

