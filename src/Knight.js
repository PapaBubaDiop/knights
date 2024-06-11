import React from 'react';

const Knight = ({ knight, touch, onCellClick }) => {
const d = [0,1,2,4,8,16,32,64,128,256,512,1024,2048];
const imagePath = `${process.env.PUBLIC_URL}/assets/m_${knight.value}.png`;
const image = `${process.env.PUBLIC_URL}/assets/m_0.png`;


  var startPos = -10; 
  var midPos = 1; 
  var endPos = -1; 

  const drop = knight.drop
  if (drop>0) {
//    console.log("id ", knight.id, "     drop ", drop);
    startPos = -50*drop; 
    midPos = 5*drop; 
    endPos = -5*drop; 

  }

  const style = {
//    width: `${width}px` // Convert width to string and add 'px'
        '--start-pos': `${startPos}px`,
        '--mid-pos': `${midPos}px`,
        '--end-pos': `${endPos}px`
  };


  const handleContextMenu = (event) => {
    event.preventDefault(); // Prevent the default context menu
  };


  const handleClick = (k) => {
    // Call the callback function passed from App.js
    onCellClick(k);
  };


  return (
    <div className="knight"
       style={style}
        onClick={() => handleClick(knight)}
      >
       
      <img 
        src={ touch ? image : imagePath} 
        alt="Knight" 
        onContextMenu={handleContextMenu} // Prevent context menu
        draggable="false"  // Ensure the image is draggable
      />

      {knight.value > 1 && knight.value < 4 && <div className="number">{d[knight.value]}</div>}
      {knight.value > 3 && knight.value < 7 && <div className="number2">{d[knight.value]}</div>}
      {knight.value > 6 && knight.value < 11 && <div className="number3">{d[knight.value]}</div>}
  


   
  
    </div>
  );
};

export default Knight;

