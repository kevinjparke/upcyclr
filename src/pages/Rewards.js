import { AvailableRewards } from "../components/AvailableRewards";

export const Rewards = () => {
    const rewards = [
        {
          title: '20% Off Your Order',
          description: 'Get 20% off on your entire purchase',
          code: 'SAVE20',
        },
        {
          title: '$10 Off Any Item',
          description: 'Save $10 on any single item in the store',
          code: 'DISCOUNT10',
        },
        
      ];

    return (
        <div className="rewards">
            <h1>Available Rewards</h1>
            <AvailableRewards rewards={rewards}/>
        </div>
    );
}