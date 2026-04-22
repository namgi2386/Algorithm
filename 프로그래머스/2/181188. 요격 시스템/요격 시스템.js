function solution(targets) {
  const N = targets.length;
  let graph = [];
  let graphReverse = [];
  for (let i = 0; i < N; i++) {
    const [a, b] = targets[i];
    graph.push([a, b, i]);
    graphReverse.push([a, b, i]);
  }
  graph.sort((a, b) => {
    return a[0] === b[0] ? a[1] - b[1] : a[0] - b[0];
  });
  graphReverse.sort((a, b) => {
    return a[1] - b[1];
  });
  const visited = new Array(N).fill(false);
  let answer = 0;
  // console.log("graph", graph);
  // console.log("graphR", graphReverse);
  let graphPointer = 0;
  for (let i = 0; i < N; i++) {
    const [a, b, idx] = graphReverse[i];
    if (visited[idx]) continue;
    visited[idx] = true;
    answer++;
    for (let j = graphPointer; j < N; j++) {
      const [ag, bg, idxg] = graph[j];
      if (ag >= b) {
        graphPointer = j;
        break;
      }
      if (visited[idxg]) continue;
      visited[idxg] = true;
    }
  }
  return answer;
}
