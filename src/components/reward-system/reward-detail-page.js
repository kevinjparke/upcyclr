import { useParams } from 'react-router-dom';
import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../App'; 
import { UserAuth } from '../../context/AuthContext';


export const RewardDetail = () => {
  const { rewardId } = useParams();
  const {rewards, setRewards } = useContext(AppContext);
  const {user} = UserAuth();
  const [userData, setUserData] = useState(null);

  const reward = rewards.find((reward) => reward.id === rewardId);

  useEffect(() => {
    fetch('https://ebava5cw1m.execute-api.us-east-1.amazonaws.com/default/UserDBService')
      .then(response => response.json())
      .then(data => {
        const currentUser = data.Items.find(item => item.id === user.uid);
        console.log(currentUser);
        setUserData(currentUser);
      })
      .catch(error => console.error('Error:', error));
  }, [user.uid]);

  // const handleRedeemReward = () => {
  //   if (userData.rewards >= reward.points) {
  //     const updatedUserData = { ...userData, rewards: userData.rewards - reward.points };
  
  //     fetch('https://ebava5cw1m.execute-api.us-east-1.amazonaws.com/default/UserDBService', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(updatedUserData),
  //     })
  //       .then(response => response.json())
  //       .then(data => {
  //         setUserData(updatedUserData);
  //       })
  //       .catch((error) => {
  //         console.error('Error:', error);
  //       });
  //   } else {
  //     alert('Insufficient points to receive this reward. Checkout our other offers.');
  //   }
  // };

  const handleRedeemReward = () => {
    if (userData.rewards >= reward.points) {
      const updatedUserData = { ...userData, rewards: userData.rewards - reward.points };
  
      fetch('https://ebava5cw1m.execute-api.us-east-1.amazonaws.com/default/UserDBService', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      })
        .then(response => response.json())
        .then(data => {
          setUserData(updatedUserData);

          // Update reward redeemedBy
          const updatedRedeemedBy = reward.redeemedBy ? [...reward.redeemedBy, user.uid] : [user.uid];
          const updatedReward = { ...reward, redeemedBy: updatedRedeemedBy };

          fetch('https://2g9huql1jg.execute-api.us-east-1.amazonaws.com/test/update-rewards', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: reward.id,
              redeemedBy: updatedRedeemedBy
            }),
          })
            .then(response => response.json())
            .then(data => {
              const updatedRewards = rewards.map((r) => r.id === reward.id ? updatedReward : r);
              setRewards(updatedRewards);
            })
            .catch((error) => {
              console.error('Error:', error);
            });

        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      alert('Insufficient points to receive this reward. Checkout our other offers.');
    }
  };


  return (
<div style={{ background: 'linear-gradient(to bottom, #f0f0f0, #d3ffd3)', minHeight: '100vh', padding: '16px' }}>
          <h2>{reward.title}</h2>
          <p>{reward.description}</p>
          <p>Points required: {reward.points}</p>
          {userData ? (
            <>
              <p>Your total points: {userData.rewards}</p>
              <button onClick={handleRedeemReward}>Redeem Reward</button>
            </>
          ) : (
            <p>Loading user data...</p>
          )}
        </div>
  );
};
