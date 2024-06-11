// SaveScore.js
import React, { useState, useEffect } from 'react';
import './Score.css'; // Import CSS file for styling
import { updateScore, hiddenScore, getUrl } from './Utils';

const SaveScore = ( {score, items, handlePage } ) => {
  


  const [user, setUser] = useState("Anonimus")
  const [userId, setUserId] = useState(0)
  const url = getUrl()+'top.php?id='


  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    var id = searchParams.get('id'); 
    var name = searchParams.get('user');
    if (id === null) id = 1001; 
    if (name === null) name="Anonimus";

    console.log("id, user=", id, name)



    if (userId === 0) { 
      if (items===null) {
        name = "@Unknown";
        console.log("user =", name, userId)
        hiddenScore(score, id, name);
        setUserId(id)
        setUser(name)
      } else {
        name = encodeURIComponent(name);
        console.log("user ID==", userId)
        updateScore(score, id, name, items);
        setUserId(id)
        setUser(name)
      }
    }
  }, [score, userId, user, items]); 


  const restartApp = () => {
    window.location.reload(); // Reload the browser window
  };
 

  return (
   <div className="score-container">
      <div className="score-content">
        <h3>Dear {user} your score is {score}</h3>
         <div className="iframe-container">
       <iframe 
        src={url+userId+"&score="+score+"&user="+user}
        title="Save Hi Score"
        width="100%"
        height="240px"
      />
      </div>
 { userId===1001 ?  
        <p>* Game is over cause there are no more possible moves.
        So you have escaped the game without saving the score and
        a real TON coin still awaits for you.</p>
      :
        <p>* Game is over cause there are no more possible moves.
         Unfortunally you not capture a impressive knight number 1024, 
        a real TON coin still awaits for you.</p>
    }
      <div onClick={restartApp} className="back-to-play-btn">Play New Game</div>
      </div>
    </div>
  );
}

export default SaveScore;
