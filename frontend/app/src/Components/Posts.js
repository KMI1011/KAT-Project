import React, { useState, useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faComment, faHeart, faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import './Posts.css';



const Posts = () => {
  //Declare and initialize variables for the post components
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newComment, setNewComment] = useState('');

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleAddComment = async (postId) => {
        if (!newComment.trim()) return; // Check and don't add empty comments
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // Create comment data object that will be sent as request to express
        const commentData = {
            postId,
            comment: newComment,
            username: currentUser.username,  //Get username from local storage
            profile: currentUser.profile  // Get user profile image to add to comment
        };
    try {
            // Send POST request to Express server add-comment endpoint
            const response = await fetch('http://localhost:5000/add-comment', {  
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commentData),
            });

            const data = await response.json();
        if (response.ok) {
                // After successfully adding the comment, update the posts state
                setPosts((prevPosts) => {
                    return prevPosts.map((post) => {
                        if (post.id === postId) {
                            return { ...post, comments: data.post.comments };
                        }
                        return post;
                    });
                });
                setNewComment(''); // Clear the comment input
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error adding comment:', error.message);
        }
    };
  //Fetch posts from posts.json in the public folder
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await fetch('/posts.json'); //Fetch JSON file
          if (!response.ok) {
            throw new Error('Failed to fetch posts');
          }
          const postsData = await response.json(); //Parse JSON data
          if (Array.isArray(postsData)) { //Check if data is an array
            setPosts(postsData.reverse()); //Set posts state + Reverses to show latest posts first
          } else {
            throw new Error('Posts data is not an array')

          }
        } catch(error) {
          setError(error.message); //Set error state
        } finally {
          setLoading(false); //Set loading to false after fetch attempt
        }
      };
      fetchPosts(); //Call fetchPosts function
    }, []); //Empty dependency array to run only once on mount

    //Render loading, error, or posts based on state
    if (loading) {
      return <div><p>Loading posts...</p></div>;
    }
    if (error) {
      return <div><p>Error: {error}</p></div>;
    }

//Return HTML elems and interpolate data from posts.json

//Return HTML elems and interpolate data from posts.json
    return (
      <div className="posts-container">
        {posts.map((post) => (
          <div className="post-form" key={post.id}>
            <div className="post">
              <div className="user">
                <span>
                  <img className="user-avatar"
                    src={post.user}
                    alt="User Avatar"
                  />
                </span>
                <p className="username">{post.username}</p>
              </div>

              <div className="card post-item">
                <div className="card-image">
                  <img
                    className="post-image"
                    src={post.image}
                    alt={post.description}
                  />
                </div>
                <div className ="card-comment-like">
                  <FontAwesomeIcon id ="comment" icon={faComment} />Comments
                  <FontAwesomeIcon id = "like" icon={faThumbsUp} />{post.likes || 0}
                </div>
                <div className="card-content">
                  <h5 className="post-description">{post.description}</h5>
                  <p className="post-created">{post.created}</p>
                </div>
                <div className="add-comment"> 
                  <input
                  type="text"
                  value={newComment}
                  onChange={handleCommentChange}
                  placeholder="Add a comment"
                />
                <button onClick={() => handleAddComment(post.id)}>
                  Add Comment
                  </button>
                </div>
                <div className="comments-section">
                  {post.comments && post.comments.map((comment) => (
                    <div key={comment.id} className="comment">
                    <img src={comment.user.profile}/>
                    <p><strong>{comment.user.username}</strong> : {comment.comment}</p>                       
                    <small>{comment.created}</small>
                  </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
export default Posts;
