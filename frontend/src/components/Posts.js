
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import './Posts.css';

const API_URL = 'http://localhost:8080/api';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Keep comment text separately for each post
  const [newComments, setNewComments] = useState({});

  const handleCommentChange = (postId, value) => {
    setNewComments((prev) => ({
      ...prev,
      [postId]: value,
    }));
  };

  // Format the date returned by Spring Boot
  const formatDate = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return dateString;
    }

    return date.toLocaleString();
  };

  // Convert image data from Spring Boot to a browser image URL
  const getImageUrl = (image) => {
    if (!image || typeof image !== 'string') {
    return null;
    }

    // Already a complete image URL
    if (
      image.startsWith('data:image/') ||
      image.startsWith('http://') ||
      image.startsWith('https://') ||
      image.startsWith('blob:')
    ) {
      return image;
    }

    // Identify the image format
    let mimeType = 'image/jpeg';

    if (image.startsWith('iVBOR')) {
      mimeType = 'image/png';
    } else if (image.startsWith('R0lGOD')) {
      mimeType = 'image/gif';
    } else if (image.startsWith('UklGR')) {
      mimeType = 'image/webp';
    }

    return `data:${mimeType};base64,${image}`;
  
  };

  // Comments require a Spring Boot endpoint
  const handleAddComment = (postId) => {
    const comment = newComments[postId]?.trim();

    if (!comment) return;

    let currentUser = null;

    try {
      currentUser = JSON.parse(
        localStorage.getItem('currentUser')
      );
    } catch (error) {
      console.error('Invalid stored user:', error);
    }

    if (!currentUser) {
      alert('Please log in to comment.');
      return;
    }

    // The previous endpoint used Express on port 5000.
    // Do not send comments until the Spring Boot API exists.
    alert(
      'Comment functionality is not connected to Spring Boot yet.'
    );
  };

  // Fetch posts from Spring Boot
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/posts`);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch posts (HTTP ${response.status})`
          );
        }

        const postsData = await response.json();

        if (!Array.isArray(postsData)) {
          throw new Error(
            'The Posts API did not return an array.'
          );
        }

        // Sort newest posts first
        const sortedPosts = [...postsData].sort(
          (a, b) => (b.post_id ?? 0) - (a.post_id ?? 0)
        );

        setPosts(sortedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="posts-container">
        <p>Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="posts-container">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="posts-container">
      {posts.length === 0 ? (
        <p>No posts available yet.</p>
      ) : (
        posts.map((post) => {
          const postId = post.post_id;
          const imageUrl = getImageUrl(post.image);

          return (
            <div className="post-form" key={postId}>
              <div className="post">

                {/* User information */}
                <div className="user">
                  <p className="username">
                    User #{post.user_id}
                  </p>
                </div>

                <div className="card post-item">

                  {/* Post image */}
                  {imageUrl && (
                    <div className="card-image">
                      <img
                        className="post-image"
                        src={imageUrl}
                        alt={post.title || 'Post image'}
                      />
                    </div>
                  )}

                  {/* Likes and comments */}
                  <div className="card-comment-like">
                    <FontAwesomeIcon
                      id="comment"
                      icon={faComment}
                    />
                    Comments

                    <FontAwesomeIcon
                      id="like"
                      icon={faThumbsUp}
                    />
                    {post.likes || 0}
                  </div>

                  {/* Post content */}
                  <div className="card-content">
                    <h4 className="post-title">
                      {post.title}
                    </h4>

                    <h5 className="post-description">
                      {post.content}
                    </h5>

                    <p className="post-created">
                      {formatDate(post.created)}
                    </p>
                  </div>

                  {/* Add comment */}
                  <div className="add-comment">
                    <input
                      type="text"
                      value={newComments[postId] || ''}
                      onChange={(e) =>
                        handleCommentChange(
                          postId,
                          e.target.value
                        )
                      }
                      placeholder="Add a comment"
                    />

                    <button
                      onClick={() =>
                        handleAddComment(postId)
                      }
                    >
                      Add Comment
                    </button>
                  </div>

                  {/*/ Display comments if provided by API */}
                  <div className="comments-section">
                    {Array.isArray(post.comments) &&
                      post.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="comment"
                        >
                          {comment.user?.profile && (
                            <img
                              src={comment.user.profile}
                              alt="User avatar"
                            />
                          )}

                          <p>
                            <strong>
                              {comment.user?.username ||
                                'Unknown user'}
                            </strong>
                            {' : '}
                            {comment.comment}
                          </p>

                          <small>
                            {formatDate(comment.created)}
                          </small>
                        </div>
                      ))}
                  </div>

                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Posts;