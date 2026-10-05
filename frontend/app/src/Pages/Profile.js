import React, { use, useEffect, useState } from 'react';
import './Profile.css'
import Navigation from '../Components/Navigation';

const Profile = () => {
  const [userPosts, setUserPosts] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user-posts/${currentUser.username}`);
       if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserPosts(data.posts);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    if (currentUser?.username) {
      fetchUserPosts();
    }
  }, [currentUser]);

  return (
    <div>
      <Navigation />
      <div className="profile">
        <div id="user">
          <img src={currentUser?.profile} alt="Profile" />
          <p><strong><i>{currentUser?.username}</i></strong></p>
        </div>
        <div id="bio">
          <p><strong><i>Fill in Bio</i></strong></p>
        </div>
        <div className="posts">
          {userPosts.length > 0 ? (
            userPosts.map((post, index) => (
              <img key={index} 
              src={post.image} 
              alt="User Post" 
            />
            ))
          ) : (
            <p>No posts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};
//   return (
//     <div>
//       <Navigation/>
//       <div className="profile">
//         <div id="user">
//           <img src={require('../images/8.jpg')}/>
//           <p><strong><i>KMI.1011</i></strong></p>
//         </div>
//         <div id="bio">
//           <p><strong><i>Fill in Bio</i></strong></p>
//         </div>
//         <div className="posts">
//           <img src={require('../images/auroraborealis.jpg')} alt="Icon 1" />
//           <img src={require('../images/milkyway.jpg')} alt="Icon 2" />
//           <img src={require('../images/greatpyramids.jpg')} alt="Icon 3" />
//           <img src={require('../images/ncmountains.jpg')} alt="Icon 4" />
//           <img src={require('../images/manchesterutd.jpg')} alt="Icon 5" />
//           <img src={require('../images/myBatArt.jpg')} alt="Icon 6" />
//         </div>
//       </div>
//     </div>
//   )


export default Profile;