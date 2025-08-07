function solution(begin, target, words) {
  let queue = [];
  let visited = Array(words.length).fill(false);
  if (!words.includes(target)) return 0;
  queue.push([begin, 0]);
  while (queue) {
    // console.log(queue);
    const [start, num] = queue.shift();

    if (start === target) {
      // console.log("r", start, visited, num);

      return num;
    }
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (start === word || visited[i]) continue;
      let inCorrectSpellCnt = 0;
      for (let w = 0; w < word.length; w++) {
        if (start[w] !== word[w]) {
          inCorrectSpellCnt++;
        }
      }
      if (inCorrectSpellCnt === 1) {
        queue.push([word, num + 1]);
        visited[i] = true;
      }
    }
  }

  return 0;
}