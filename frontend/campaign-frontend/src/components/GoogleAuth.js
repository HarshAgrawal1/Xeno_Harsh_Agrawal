import React,{useEffect} from 'react';
import { signInWithGooglePopup } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/GoogleAuth.css'; // Import the CSS for styling

const GoogleAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user data is already in localStorage on component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      // If the user is stored, directly navigate to Home page
      navigate('/Home', { state: { user: JSON.parse(storedUser) } });
    }
  }, [navigate]);

  const logGoogleUser = async () => {
    try {
      const result = await signInWithGooglePopup();
      const user = result.user;

      const userData = {
        googleId: user.uid,
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };

      // Send user data to your backend
      await axios.post('http://localhost:5000/api/auth/google', userData);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/Home', { state: { user: userData } });
      console.log('User data saved to MongoDB:', userData);
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
    }
  };

  return (
    <div className="google-auth-container">
      <button onClick={logGoogleUser} className="google-auth-button">
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleAuth;
