import React from 'react';
import {Link} from 'react-router-dom';
import './Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faArrowLeft, faMessage } from '@fortawesome/free-solid-svg-icons';
import { faSearchengin } from '@fortawesome/free-brands-svg-icons';


const Navigation =({username}) => {
  const [dropdownVisible, setDropdownVisible] = React.useState(false);

//I want to display a meny that will display onClick
    const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
//I wanna close the menu when I click outside of it
  const handleDropdownClose = () => {
    setDropdownVisible(false);
  };
//I want to log out the user when they click the logout button
  const handleLogout = () => {
    // Clear user session or token here
    alert('Logged out successfully!');
    // Redirect to login page or home page
    window.location.href = '/';
  };

  //Nav bar with links to the different pages and a dropdown menu for the user profile
      //crea a nav bar
    ///dd title to left side of nav bar
    //Add an image to the right side
    //Click on image to display menu
    //Click on the hyperlinks
    //Close menu when click outside of it

  return (
    <nav className="navbar-me">
      <div className="navbar-abt-me">
        <span id="nav-title"><b>About</b> ME</span>
      </div> 
      <div className="navbar-profile">
        <img
        className="img-nav"
        src={require('../images/8.jpg')}
        alt="User"
        onClick={toggleDropdown}
        /> 
      </div>
      <div className={dropdownVisible ? 'dropdown-menu show' : 'dropdown-menu'}>
         <Link to="/home" onClick={handleDropdownClose}>
            <FontAwesomeIcon icon={faHouse} />
            <span id="link-text">Home</span>
          </Link>
          <Link to="/explore" onClick={handleDropdownClose}>
            <FontAwesomeIcon icon={faSearchengin} />
            <span id="link-text">Explore</span>
          </Link>
          <Link to="/profile" onClick={handleDropdownClose}>
            <FontAwesomeIcon icon={faUser} />
            <span id="link-text">Profile</span>
          </Link>
          <Link to="/add-post" onClick={handleDropdownClose}>
            <FontAwesomeIcon icon={faUser} />
            <span id="link-text">Add Post</span>
          </Link>
          <Link to="/chatroom" onClick={handleDropdownClose}>
           <FontAwesomeIcon icon={faMessage} />
           <span id="link-text">Chat</span>
          </Link>
          <Link to="/" onClick={handleDropdownClose}>
           <FontAwesomeIcon icon={faArrowLeft} />
           <span id="link-text">Logout</span>
          </Link>
      </div>
    </nav> 

///OG Dropdown menu code
    
    // <nav className="navbar-me">
    //   <ul>
    //   <li><Link to="/Home">Home</Link></li>
    //   <li><Link to="/Profile">Profile</Link></li>
    //   <li><Link to="/Settings">Settings</Link></li>
    //   <li><Link to="/Explore">Explore</Link></li>
    //   </ul>
    // </nav>
   
  );
  
};


export default Navigation