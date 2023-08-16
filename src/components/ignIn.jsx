import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card } from 'react-bootstrap'
import { GoogleButton } from 'react-google-button';
import { UserAuth } from "../context/AuthContext";
import {useNavigate} from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseAuth";
import PickUpRequests from "../Admin/PickUpRequests";
import axios from "axios";
import { setUserId } from "firebase/analytics";



const SigninGoogle = () => {
    const { googleSignIn, user } = UserAuth();
    const navigate = useNavigate()

    
    const emailRef = useRef()
    const passwordRef = useRef()
    const displayNameRef = useRef()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    //sign up
   

    
  const handleNew = () => {
    navigate('/SignUp')
  };

    // normal sign in
    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword( auth, email, password)
        .then((userCredential) => {
            console.log(userCredential)
            navigate('/Account')
        }).catch((error) => {
            console.log(error)
        })
        
    }


   //Fetch uid

   let uid; 
   let Name;// Replace this with your UID   // Function to check if the ID exists in the JSON object  
   const isUidInItems = (data) => {     return data.Items.some(item => item.id === uid);   };   
   // Function to make the POST request  
   const makePostRequest = () => {     const postData = {       id: uid,       email: user.email,       username: Name,       rewards: 0    };    
    axios.post("https://ebava5cw1m.execute-api.us-east-1.amazonaws.com/default/UserDBService", postData)       .then(response => {         
    // Handle the response if needed        
    console.log("POST request successful:", response.data);       })       .catch(error => {         
        // Handle errors if needed        
        console.error("Error making POST request:", error);       });   
    
    };   
        
        
        
        const initialUser = () => {    
             // Fetch the JSON data from the GET request   
              axios.get("https://ebava5cw1m.execute-api.us-east-1.amazonaws.com/default/UserDBService")       .then(response => {         const data = response.data;         
                // Check if the ID exists in the "Items" array        
                if (!isUidInItems(data)) {           
                    // If the ID does not exist, make the POST request          
                    makePostRequest();         }       })       .catch(error => {         
                        // Handle errors if needed        
                        console.error("Error fetching data:", error);       });   };



    const handleGoogleSignIn = async () => {
        try{
            await googleSignIn();
        }catch (error){
            console.log(error);
        }
    }

    

    useEffect(() => {
        if (user != undefined ){
            
        uid=user.uid;
        if(user.displayName == null){
            Name = user.email
        }
        else
          Name = user.displayName
        initialUser()
        navigate('/Home2')
        }
          
        console.log(user)
    }, [user])



return(
<>
<Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sign In</h2>
                <Form onSubmit={signIn}>
                    <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref = {emailRef} onChange={(e)=> setEmail(e.target.value)} required />
                    </Form.Group>

                    <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref = {passwordRef} onChange={(e)=> setPassword(e.target.value)} required />
                    </Form.Group>

                    <Button className="w-100" type="submit">Sign In</Button>

                    
                </Form>
            </Card.Body>
        </Card>
<Card>
    <Card.Body>
        <h2 className="text-center mb-4">Welcome to Recycle Rewards</h2>
        <GoogleButton onClick={handleGoogleSignIn}/>
    </Card.Body>
    
    <Card>
      <h2 className="text-center mb-4" onClick={handleNew}>Don't have an account?</h2>
    </Card>
</Card>

</>
)
}

export default SigninGoogle;