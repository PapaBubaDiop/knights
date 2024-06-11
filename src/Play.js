// Play.js
import React, { useState } from 'react';
import useSound from 'use-sound'
import mySound from './combo.mp3' // Your sound file path here
import Knight from './Knight';
import Award from './Award';
import './App.css';
import packageJson from '../package.json'; // Adjust the path if necessary

import { findDrop, findFreeCell, findDropValue, checkEnd, saveKnights, checkAwards } from './Utils';



const Play = ({ items, points, handlePage }) => {
  const [playSound] = useSound(mySound)
  const imagePath = `${process.env.PUBLIC_URL}/assets/c_`;
  const ground = [
  [0,1,2,0],
  [1,2,1,2],
  [2,1,2,1],
  [0,2,1,0],
  ]

  const ncol = 4
 
  const [knights, setKnights] = useState(items);
  const [score, setScore] = useState(points)
  const [clicks, setClicks] = useState(0)
  
  const [touchId, setTouchId] = useState(0)
  const [gameFinished, setGameFinished] = useState(false);
  const [visibleCells, setVisibleCells] = useState(ground); // Array to track visibility of cells

  const [awardCount, setAwardCount] = useState(0);
  
  const toggleAward = (award) => {
    setAwardCount(award);
  };


  const delayAward = (award) => {
    playSound()
    setTimeout( () => {toggleAward(award)}, 700 );
  };


  const removeElement = (array, index) => {
    array.splice(index, 1);
    return array;
  };


  function doubleKnight(knight) {
    const { id: kId, row: kRow, col: kCol, value: kValue } = knight;
//    console.log("doubleKnight = ", kRow, kCol)
    const knightIndex = knights.findIndex(knight => knight.id === touchId);
    const updatedKnights = [...knights];
    const {  row: r, col: c, value: val } = updatedKnights[knightIndex];
    const validMove = (((Math.abs(r - kRow) === 2 && Math.abs(c - kCol) === 1) ||
                      (Math.abs(r - kRow) === 1 && Math.abs(c - kCol) === 2))) &&
                      val === kValue;
    if (validMove) {
      const d = [0,1,2,4,8,16,32,64,128,256,512,1024,2048];
      const val2 = val + 1;
      const flag = checkAwards(updatedKnights, val2);
      updatedKnights[knightIndex] = { id: touchId, row: kRow, col: kCol, value: val2, drop: 0 };
      const indexToRemove = knights.findIndex(knight => knight.id === kId);
      removeElement(updatedKnights, indexToRemove);
      setKnights(updatedKnights);
      setScore(score+d[val]);
      const c = clicks
      if (c>4) {
        setClicks(0)
        console.log("clicks=", c)
        saveKnights(score, updatedKnights)
      } else {
        setClicks(c + 1)
      }
      if (flag>0) delayAward(flag); 
    }
    setVisibleCells(ground);
    setTouchId(0);

  }

  function dropKnights(updatedKnights) {
     // drop 2 knight
        const upKnights = [...updatedKnights];
        const d1 = findDrop(1,upKnights)
        if (d1>0) {
          const d2 = findDrop(d1+1,upKnights)
          if (d2>0) {
            const coord1 = findFreeCell(upKnights);
            const v1 = findDropValue();
            upKnights.push( { id: d1, row: coord1.row, col: coord1.col, value: v1, drop:1+coord1.row } );
            const coord2 = findFreeCell(upKnights);
            const v2 = findDropValue();
            upKnights.push( { id: d2, row: coord2.row, col: coord2.col, value: v2, drop:1+coord2.row } );
          } else {
            const coord1 = findFreeCell(upKnights);
            const v = findDropValue();
   
            upKnights.push( { id: d1, row: coord1.row, col: coord1.col, value: v, drop:1+coord1.row } );
          }
        }
        setKnights(upKnights);
        var f = checkEnd(upKnights)
        setGameFinished(f);
        if (f) {
            playSound()
        }
  }

  function moveKnight(row, col) {
  //  console.log("moveKnight = ", row, col)
    const knightIndex = knights.findIndex(knight => knight.id === touchId);
    const updatedKnights = [...knights];
    const { id: index, value: val } = updatedKnights[knightIndex];
    // Implement L-shaped move validation
    if (visibleCells[row][col] === 3) {
      updatedKnights[knightIndex] = { id: index, row: row, col: col, value: val, drop: 0 };
      setKnights(updatedKnights);
      setTimeout( () => {dropKnights(updatedKnights)}, 300 );
    }
    setVisibleCells(ground);
    setTouchId(0)
  }
 
  const handleClick = (row, col) => {
    if (touchId>0) {
      const kIndex = knights.findIndex(knight => knight.row === row && knight.col === col);
      if (kIndex>=0) {
        doubleKnight(knights[kIndex]);
      } else {
        moveKnight(row, col);
      } 
    }
  }
  
  const saveScorePage = () => {
    handlePage(3, knights, score);
  }

  const noSaveScorePage = () => {
    console.log("--------------noSaveScorePage------------")
    
    handlePage(3, null, score);
  }

  const handleKnightClick = (knight) => {
 // console.log("Touch Id = ",touchId)
  let  kRow = knight.row
  let  kCol = knight.col
  let  kValue = knight.value
  let  kId = knight.id

  if (touchId===0) { 
    const updatedCells = [...visibleCells]
     
    for(let row=0; row < 4; row++){
    for(let col=0; col < 4; col++){
      if (ground[row][col]>0) {
      var validMove = (Math.abs(row - kRow) === 2 && Math.abs(col - kCol) === 1) ||
                  (Math.abs(row - kRow) === 1 && Math.abs(col - kCol) === 2);
      if (validMove) {
        const knightIndex = knights.findIndex(knight => knight.row === row && knight.col === col);
        if (knightIndex>=0) {
          const { value: val } = knights[knightIndex];
          if (kValue === val) updatedCells[row][col] = 3;
        } else {
          updatedCells[row][col] = 3
        }
      }
    }}}
      updatedCells[kRow][kCol] = 4
      setVisibleCells(updatedCells);
      setTouchId(kId)
    } else {
      doubleKnight(knight)
    }
  };

  return (
    <div className="App">
    { !gameFinished ?  
      <div className="bar">
        <div onClick={() => handlePage(1, knights, score)}
          className="custom-link">?Help
        </div>
        <div onClick={() => handlePage(2, knights, score)} 
          className="custom-link">Score: { score }
        </div>
      </div>
      :
      <div className="bar">
        <div onClick={() => noSaveScorePage()} className="custom-link">Restart</div>
        <div className="final-link">Final: { score }</div>
      </div>
    }
    <div className="board">
        {[...Array(4)].map((_, row) => (
          [...Array(ncol)].map((_, col) => (
            <div key={`cell-${row}-${col}`}  className={`cell`}>
              <img src={imagePath + visibleCells[row][col] + ".png"} alt="Color" 
              draggable="false" 
              onClick={() => handleClick(row,col)}
              /> 
              {knights.map(knight => (
                knight.row === row && knight.col === col &&
                <Knight
                  key={knight.id}
                  knight={knight}
                  touch = {knight.id===touchId}
                  onCellClick={handleKnightClick}
                  className="knight"
                />
              ))}
            </div>
          ))
        ))}
    </div>
 

    { gameFinished ? 
        <div onClick={() => saveScorePage()} className="save-score-btn">Save score</div>
      :
        <div className="version">Version: {packageJson.version}</div>
    }
    {awardCount>0 && <Award award={awardCount} onClose={toggleAward} />}
    </div>
)}

export default Play;





