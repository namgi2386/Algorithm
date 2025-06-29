function solution(A, B) {
  let rpt = B.repeat(2);

  if (A === B) {
    return 0;
  } else if (rpt.indexOf(A) < 0) {
    return -1;
  } else {
    return rpt.indexOf(A);
  }
}