import { AvailableRewardsScrollView } from "./available-rewards-scroll-view";
import { useContext, useEffect } from 'react';
import { AppContext } from '../../App.js';
import { RedeemedRewards } from "./redeemed-rewards";

export const Rewards = () => {
  const {rewards, setRewards} = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const url = 'https://2g9huql1jg.execute-api.us-east-1.amazonaws.com/test/getrewards';
            const headers = {
              "content/type": "application/json"
            }
            // Make the fetch request
            const response = await fetch(url, headers);
            
            if (!response.ok) {
              throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log(data.data)
            
            setRewards(data.data);
            console.log(rewards)
          } catch (error) {
            console.error('API Error:', error);
          }   
    };

    fetchData();
  }, []);

  
    return (
      <div style={{ background: 'linear-gradient(to bottom, #f0f0f0, #d3ffd3)', minHeight: '100vh', padding: '16px' }}>
      {/* <Navbar></Navbar> */}
          <AvailableRewardsScrollView />
          <RedeemedRewards />
      </div>
    );
}