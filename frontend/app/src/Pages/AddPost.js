import React, { useState } from 'react';
import './AddPost.css';
import Navigation from '../Components/Navigation';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const navigate = useNavigate();

    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    if (!currentUser) {
        return <div>Please log in to add a post.</div>;
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            setPreview(URL.createObjectURL(file)); // url that previews img
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            alert('Please upload an image!');
            return;
        }
    const formData = new FormData();
        formData.append('description', description);
        formData.append('image', image);
        formData.append('username', currentUser.username);
        formData.append('profile', currentUser.profile);
        try {
            const response = await fetch('http://localhost:5000/add-post', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to add post');
            }

            const data = await response.json();
            console.log('Post added successfully:', data);
            setDescription('');
            setImage(null);
            setPreview(null);

            // Navigate to Home page once post is successfully added
            navigate('/home');
        } catch (error) {
            console.error('Error:', error);
        }
    };
return (
        <div>
            <Navigation />
            <div className="add-post-container">
                <h2>Add a New Post</h2>
                <form onSubmit={handleSubmit} className="add-post-form">
                  <div className="input-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="image">Upload Image</label>
                        <input
                            type="file"
                            id="image"
                            onChange={handleImageChange}
                            accept="image/*"
                            required/>
                      </div>{/* Show the preview image*/}
                    {preview && (
                        <div className="image-preview">
                            <p>Image Preview:</p>
                            <img src={preview} alt="Preview" className="preview-img" />
                        </div>
                    )}
                    <button type="submit" className="submit-btn">Submit Post</button>
                </form>
            </div>
        </div>
    );
};

export default AddPost;

