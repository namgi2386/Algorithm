function solution(participant, completion) {
  let map = new Map();
  for (c of participant) {
    map.set(c, map.has(c) ? map.get(c) + 1 : 1);
  }
  for (c of completion) {
    map.set(c, map.get(c) - 1);
  };
  for(c of [...map]){
    if(c[1]) return c[0]
  }
}