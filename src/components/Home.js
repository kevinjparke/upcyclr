import React from 'react';
import {useNavigate} from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap'

const Home = () => {

  const navigate = useNavigate()

  const handleSignInClick = () => {
    navigate('/SignIn')
  };

  return (
    <div>
      
      <h1>Welcome to the Home Page</h1>
      {/* <p>This is the content of the home page.</p> */}
      {/* <div>
      <h1>Sign In </h1>
      <button onClick={handleSignInClick}>Sign In</button>
    </div> */}

    <div>
    <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sign In</h2>
                <Form onSubmit={handleSignInClick}>

                    <Button className="w-100" type="submit">Sign In</Button>
                </Form>
            </Card.Body>
        </Card>
    </div>
    
    </div>
    
  );
};

export default Home;