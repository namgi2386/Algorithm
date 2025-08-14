function solution(arr) {
  const fnc = (a, b) => {
    if (!(a % b)) return b;
    return fnc(b, a % b);
  };
  return arr.reduce((a, b) => Math.floor((a * b) / fnc(a, b)));
}