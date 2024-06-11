// Help.js
import React from 'react';
import './Help.css'; // Import CSS file for styling

const Help = ({ handlePage }) => {

  const image = `${process.env.PUBLIC_URL}/assets/helps.png`;
  const hand = `${process.env.PUBLIC_URL}/assets/hand.png`;
  return (
    <div className="help-container">
      <div className="help-text">
       The objective is to accumulate the highest score. 
        To do so, strategically move the knights across the chessboard. 
        Knights follow the chess L-shaped movement pattern.
        Knights can leap to an unoccupied square 
        or to a square occupied by a knight of the same color.
        Upon capturing a knight 128, you ll earn a first-tier award. 
        For those who dare to capture a knight 1024, 
        a real TON coin awaits as a reward.
      </div>
        <div className="container-mix">
          <img src={image} alt="Helper" className="help-image" />
          <img src={hand} alt="Hand" className="hand-image" />
        </div>
        <div onClick={() => handlePage(0, null, null, null)} className="back-to-play-btn">Back to Play</div>
      
  
    </div>
  );
}

export default Help;









