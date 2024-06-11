import React from 'react';
import './Award.css'; // Assuming you have some styles for the popup

const Award = ({ award, onClose }) => {
  const bg = `${process.env.PUBLIC_URL}/assets/bg.png`;
  const image = `${process.env.PUBLIC_URL}/assets/p_${award}.png`;
  console.log("award image", image)

  var txt = "Ups..."

  switch(award) {
    case  1: 
      txt = "Верной дорогой идете товарищ!"; 
      break;
    case  2: 
      txt = "Ого! Так вы выиграете 1 ТОН"; 
      break;
    case  3: 
      txt = "Браво, еще чуть-чуть и ТОН ваш"; 
      break;
    case  4: 
      txt = "1 TON earned!"; 
      break;
    default: 
      txt = "Это невероятный результат"; 
      break;
  }


  return (
    <div className="popup-overlay" onClick={() => onClose(0)}>
      <div className="popup-content">
       <div className="image-container">
          <img src={bg} alt="Bg Award" />
          <img src={image} alt="Award" className="img-overlay"/>
          <div className="text-overlay">{txt}</div>
        </div>
      </div>
    </div>
  );
};

export default Award;
