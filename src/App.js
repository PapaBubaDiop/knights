// App.js
import React, { useState, useEffect } from 'react';
import Play from './Play';
import Help from './Help';
import TopScores from './TopScores';
import SaveScore from './SaveScore';
import { restoreKnights, checkRestore, randomKnights, getUrl } from './Utils';

const App = () => {
  const [page, setPage] = useState(0)
  const [score, setScore] = useState(0)
  const [data, setData] = useState(null);
  const [userId, setUserId] = useState(1001);

  const [items, setItems] = useState([
    { id: 1, row: 1, col: 0, value: 1, drop: 0 },
    { id: 2, row: 2, col: 2, value: 1, drop: 0 },
    { id: 3, row: 0, col: 2, value: 1, drop: 0 },
  ]);

  
  const handlePage = (pageId, array, points) => {
    console.log("Page Id = ", pageId)
    if (array!==null || pageId===3) setItems(array)
    if (points!==null) setScore(points)
    
    setPage(pageId)
  }


  useEffect(() => {

  const searchParams = new URLSearchParams(window.location.search);
  var id = searchParams.get('id');
  if (!id) id = 1001  
  setUserId(id)
  const url = getUrl()+`get_state.php?id=${id}`
  console.log('url ------------------->', url); // Handle any errors
  fetch(url, { 
    headers: {}
  })
  .then(response => {
    return response.json(); // or response.text() if the response is not in JSON format
  })
  .then(data => {
    var pts = parseInt(data.pts)
    const flag = checkRestore(data.nums)     
    console.log('Restore flag-------->', flag)

    if (pts>1 && flag===true) {

      setItems(restoreKnights(data.nums))
//      restoreKnights(data.nums)
    } else {
      pts = 0
      setItems(randomKnights())
    }
    setScore(pts)
    setData(data);
  })
  .catch(error => {
    console.error('fetch operation:', error); // Handle any errors
  });
 
 

}, []); 


  if (!data) {
        return <div className="loading-overlay">Loading...</div>;
  }



  return (
    <div className="App">
      {page===0  && <Play items={items} points={score} handlePage={handlePage} />}
      {page===1  && <Help handlePage={handlePage} />}
      {page===2  && <TopScores user={userId} handlePage={handlePage} />}
      {page===3  && <SaveScore score={score} items={items} handlePage={handlePage}/>}
    </div>
  );
}

export default App;  

