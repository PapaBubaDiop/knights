// TopScores.js
import React from 'react';
import './Top.css'; // Import CSS file for styling
import { getUrl } from './Utils';

const TopScores = ({ user, handlePage }) => {
  const url = getUrl()+`top.php?id=${user}&score=0`
  return (
     <div className="top-container">
      <div className="top-content">
      <div className="iframe-container">
   
      <iframe
        src={url}
        title="Hi Scorers"
        width="100%"
        height="460px"
      />
     </div>
      
      <div onClick={() => handlePage(0, null, null, null)} className="back-to-play-btn">Back to Play</div>
     </div>
    </div>
  );
}

export default TopScores;
