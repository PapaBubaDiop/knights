// Utils.js functions

export function findDrop(startIndex, array) {
  let found = 0;
  let maxKnight=12;

  for (let i = startIndex; i <= maxKnight; i++) {
    const idx = array.findIndex(knight => knight.id === i);
    if (idx<0) {
      found = i;
      break; 
    }
  }

 //  console.log("Return the found; ",found);
 
  return found; // Return the 
}


export function findFreeCell(array) {
  var row = 0;
  var col = 0;
  let found = false;
  const cells = [
    [0,1,1,0],
    [1,1,1,1],
    [1,1,1,1],
    [0,1,1,0],

  ]


  while (!found) {
    const r = parseInt( Math.floor(Math.random() * 4));
    const c = parseInt( Math.floor(Math.random() * 4));
    if (cells[r][c]>0) {
      const index = array.findIndex(knight => knight.row === r && knight.col === c);
      if (index<0) {
        row = r;
        col = c;
        found = true;
      }
    }
  }
 //  console.log("Return (r,c);", row, col);

  return { row: row, col: col };
}






export function findDropValue() {
  const val =  1 + Math.floor(Math.random() * 2)  
//  console.log("s, r, val>>", s,r,val)
  return val;
}


export function findMaxValue(array) {
  let vmax = 0;
  for (let i = 0; i < array.length; i++) {
    const v = array[i].value;
    if (v>vmax) {
      vmax = v;
    }
  }
  return vmax;
}



export function checkEnd(array) {
  const maxKnight = 12
  if (array.length<maxKnight) {
    return false;
  }
  for (let i = 0; i < array.length; i++) {
    const v1 = array[i];
    for (let j = i+1; j < array.length; j++) {
      const v2 = array[j];
      if (v1.value === v2.value) {
        if ( (Math.abs(v1.row - v2.row) === 2 && Math.abs(v1.col - v2.col)) === 1 ||
                  (Math.abs(v1.row - v2.row) === 1 && Math.abs(v1.col - v2.col) === 2 )) {
          return false
        } 
 

      }
    }
  }
  return true;
}



function hexKnights(knights) {
  var numbers = Array(16).fill(0) 
  for (const elm of knights) {
    const { row: r, col: c, value: v } = elm;
    numbers[r*4+c] = v
  }
  return numbers.map(num => num.toString(16)).join('');
}



export const saveKnights = (score, knights) => {
  const searchParams = new URLSearchParams(window.location.search);
  var id = searchParams.get('id');
  if (!id) id = 1001;
 
  const hexString = hexKnights(knights)

  const url = getUrl()+`post_state.php?id=${id}&pts=${score}&nums=${hexString}`;

  console.log("save=", url);

  fetch(url, {})
  .then(response => {
    return response.text; // or response.text() if the response is not in JSON format
  })
  .catch(error => {
    console.error('fetch operation:', error); // Handle any errors
  });
}



export function getUrl() {
  return 'https://www.bashurov.net/tg_knights/'
}


export const updateScore = (score, id, user, items) =>  {
  const level = findMaxValue(items);
  const hex = hexKnights(items)
  const url = getUrl()+`save_score.php?id=${id}&score=${score}&user=${user}&level=${level}&hash=${hex}`
  console.log("save score url ====================>>>>>>", url);
  fetch(url, { 
    headers: {}
  })
  .then(response => {
    return response.text(); // or response.text() if the response is not in JSON format
  })
  .catch(error => {
    console.error('fetch operation:', error); // Handle any errors
  });
}


export const hiddenScore = (score, id, user) =>  {
  const url = getUrl()+`save_score.php?id=${id}&score=${score}&user=${user}&nosave=1`
  console.log("hidden url ==========>", url);
  fetch(url, { 
    headers: {}
  })
  .then(response => {
    return response.text(); // or response.text() if the response is not in JSON format
  })
  .catch(error => {
    console.error('fetch operation:', error); // Handle any errors
  });
}



export function checkRestore(hexString) {
  return /^[0-9a-fA-F]+$/.test(hexString)
}


export function restoreKnights(hexString) {
  const knights = [];
  const nums = hexString.split('').map(char => parseInt(char, 16));
  var i = 0
  for (let j = 0; j < 4; j++) {
    for (let k = 0; k < 4; k++) {
      const val = nums[j*4+k]
      if (val>0) {
        i = i + 1
        knights.push( { id: i, row: j, col: k, value: val, drop:0 } );
      }
    }
  }
  if (i<1) {
        knights.push( { id: 1, row: 1, col: 2, value: 1, drop:0 } );
        knights.push( { id: 2, row: 2, col: 2, value: 1, drop:0 } );
  } 
  console.log("(i,knights)------>", knights.length, knights);
  return knights 
}


export function randomKnights() {
  const knights = [];
  var i = 1
  knights.push( { id: i, row: 0, col: 1, value: 1, drop:0 } );
  for (let j = 1; j < 3; j++) {
    for (let k = 0; k < 4; k++) {
      const val = Math.floor(Math.random() * 6);
      if (val===1 || val===2) {
        i = i + 1
        knights.push( { id: i, row: j, col: k, value: val, drop:0 } );
      }
    }
  }
  console.log("knights---------------->", knights);
       
  return knights 
}



export function checkAwards(knights, val2) {
    var flag = true;
    for (const elm of knights) {
      const { value: v } = elm;
      if (v >= val2) flag = false;
    }
    if (flag && val2>5) {
       return val2;
    }
    return 0
}





