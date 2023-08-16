import React from 'react';
import {useNavigate} from 'react-router-dom';


const HomePage = () => {
const navigate = useNavigate()

  const handleSignInClick = () => {
    navigate('/SignIn')
  };

  return (
    <div>
      <h1>Welcome to Recycle Rewards!!</h1>
      <button onClick={handleSignInClick}>Sign In</button>
    </div>
  );
};

export default HomePage;
