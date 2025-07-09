function solution(players, callings) {
  let map = new Map();
  let antimap = new Map();
  players.map((c, i) => {
    map.set(c, i);
    antimap.set(i, c);
  });
  // console.log(map);
  // console.log(antimap);
  

  for (let i = 0; i < callings.length; i++) {
    const char = callings[i];
    const idx = map.get(char);
    const hero = antimap.get(idx-1)
    map.set(char , idx -1 )
    map.set(hero , idx )
    antimap.set(idx-1 , char)
    antimap.set(idx , hero)
    // console.log(char , idx , hero , [...map]);
    
  }

  return [...map].sort(([a1,a2] , [b1,b2]) => a2-b2).map(([a,b]) => a);
}