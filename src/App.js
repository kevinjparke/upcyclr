import React from 'react';
import { BrowserRouter, Route, Routes, Link} from "react-router-dom";
import Home from './components/Home';
import SignUp from './components/SignUp';
import PickUpRequests from './Admin/PickUpRequests';
import PickupForm from './components/pickup-request/pickup';
import PickupRequests from './components/pickup-request/pickup-history';
import { Rewards } from './components/reward-system/rewards';
import { RewardDetail } from './components/reward-system/reward-detail-page';
import { rewardsData } from './components/reward-system/rewards-data';
import { useState, createContext } from 'react';
import Account from './components/Account';

// import {LoginPage} from './componenets/LoginPage';

import SignIn from './components/ignIn';
import { AuthContextProvider } from './context/AuthContext';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import SignInForm from './components/SignIn';
import HomePage2 from './components/Home2';
import PickupForm2 from './components/pickup-request/pickup2';
import { CssBaseline, Container } from '@mui/material';

//State management: Global context
export const AppContext = createContext();

const App = () => {
  const [rewards, setRewards] = useState([]);

  return (
    <div>
      
    <AuthContextProvider>
      <BrowserRouter>
      <CssBaseline />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar></Navbar>
      <AppContext.Provider value={
        {rewards, setRewards}
        }>
      <Routes>
        <Route exact path="/" element={<HomePage2/>} />
        {/* <Route path = '/SignIn' element ={<SignIn/>}/> */}
        <Route path = '/SignUp' element={<SignUp/>}/>
        <Route path = '/Account' element = {<Account/>}/>
        <Route exact path="/admin" element={<PickUpRequests/>} />
        {/* <Route exact path="/pickUp" element={<PickupForm/>} /> */}
        <Route exact path="/pickUp" element={<PickupForm2/>} />
        <Route exact path="/pickup-history" element={<PickupRequests/>} />
        <Route exact path="/login" element={<LoginPage/>} />

        <Route exact path="/rewards" element={<Rewards/>} />
        <Route exact path="/SignIn" element={<SignInForm/>} />
        <Route exact path="/Home2" element={<HomePage2/>} />
        <Route
          path="/rewards/:rewardId"
          element={<RewardDetail rewards={rewards} />}
        />
        {/* Add more routes here if needed */}
      </Routes>
      <div style={{ flex: 1 }}></div> {/* This div will push the footer to the bottom */}
      <Footer></Footer>
      
        </AppContext.Provider>
        </div>
    </BrowserRouter>
      </AuthContextProvider>
      </div>
  );
};

export default App;
