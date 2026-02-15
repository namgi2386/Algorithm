const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [TC, ...initArr] = inputValue.split("\n").map((c) => c.trim().split(" "));

class Qube {
  constructor() {
    this.U = new Array(9).fill("w");
    this.D = new Array(9).fill("y");
    this.F = new Array(9).fill("r");
    this.B = new Array(9).fill("o");
    this.L = new Array(9).fill("g");
    this.R = new Array(9).fill("b");
    // this.U = ["w1", "w2", "w3", "w4", "w5", "w6", "w7", "w8", "w9"];
    // this.D = ["y1", "y2", "y3", "y4", "y5", "y6", "y7", "y8", "y9"];
    // this.F = ["r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9"];
    // this.B = ["o1", "o2", "o3", "o4", "o5", "o6", "o7", "o8", "o9"];
    // this.L = ["g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8", "g9"];
    // this.R = ["b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9"];
  }
  run(commend) {
    if (commend[0] === "U") {
      this.up(commend[1]);
    } else if (commend[0] === "D") {
      this.down(commend[1]);
    } else if (commend[0] === "F") {
      this.front(commend[1]);
    } else if (commend[0] === "B") {
      this.back(commend[1]);
    } else if (commend[0] === "L") {
      this.left(commend[1]);
    } else if (commend[0] === "R") {
      this.right(commend[1]);
    }
  }
  plus(prev) {
    return [
      prev[6],
      prev[3],
      prev[0],
      prev[7],
      prev[4],
      prev[1],
      prev[8],
      prev[5],
      prev[2],
    ];
  }
  minus(prev) {
    return [
      prev[2],
      prev[5],
      prev[8],
      prev[1],
      prev[4],
      prev[7],
      prev[0],
      prev[3],
      prev[6],
    ];
  }
  up(type) {
    if (type === "+") {
      this.U = this.plus(this.U);
      const [a1, a2, a3] = [this.F[0], this.F[1], this.F[2]];
      [this.F[0], this.F[1], this.F[2]] = [this.R[0], this.R[1], this.R[2]];
      [this.R[0], this.R[1], this.R[2]] = [this.B[0], this.B[1], this.B[2]];
      [this.B[0], this.B[1], this.B[2]] = [this.L[0], this.L[1], this.L[2]];
      [this.L[0], this.L[1], this.L[2]] = [a1, a2, a3];
    } else {
      this.U = this.minus(this.U);
      const [a1, a2, a3] = [this.F[0], this.F[1], this.F[2]];
      [this.F[0], this.F[1], this.F[2]] = [this.L[0], this.L[1], this.L[2]];
      [this.L[0], this.L[1], this.L[2]] = [this.B[0], this.B[1], this.B[2]];
      [this.B[0], this.B[1], this.B[2]] = [this.R[0], this.R[1], this.R[2]];
      [this.R[0], this.R[1], this.R[2]] = [a1, a2, a3];
    }
  }
  down(type) {
    if (type === "+") {
      this.D = this.plus(this.D); // 1
      const [a1, a2, a3] = [this.F[6], this.F[7], this.F[8]];
      [this.F[6], this.F[7], this.F[8]] = [this.L[6], this.L[7], this.L[8]];
      [this.L[6], this.L[7], this.L[8]] = [this.B[6], this.B[7], this.B[8]];
      [this.B[6], this.B[7], this.B[8]] = [this.R[6], this.R[7], this.R[8]];
      [this.R[6], this.R[7], this.R[8]] = [a1, a2, a3];
    } else {
      this.D = this.minus(this.D); // 1
      const [a1, a2, a3] = [this.F[6], this.F[7], this.F[8]];
      [this.F[6], this.F[7], this.F[8]] = [this.R[6], this.R[7], this.R[8]];
      [this.R[6], this.R[7], this.R[8]] = [this.B[6], this.B[7], this.B[8]];
      [this.B[6], this.B[7], this.B[8]] = [this.L[6], this.L[7], this.L[8]];
      [this.L[6], this.L[7], this.L[8]] = [a1, a2, a3];
    }
  }
  front(type) {
    if (type === "+") {
      this.F = this.plus(this.F);
      const [a1, a2, a3] = [this.U[6], this.U[7], this.U[8]];
      [this.U[6], this.U[7], this.U[8]] = [this.L[8], this.L[5], this.L[2]];
      [this.L[2], this.L[5], this.L[8]] = [this.D[0], this.D[1], this.D[2]];
      [this.D[0], this.D[1], this.D[2]] = [this.R[6], this.R[3], this.R[0]];
      [this.R[0], this.R[3], this.R[6]] = [a1, a2, a3];
    } else {
      this.F = this.minus(this.F);
      const [a1, a2, a3] = [this.U[6], this.U[7], this.U[8]];
      [this.U[6], this.U[7], this.U[8]] = [this.R[0], this.R[3], this.R[6]];
      [this.R[0], this.R[3], this.R[6]] = [this.D[2], this.D[1], this.D[0]];
      [this.D[0], this.D[1], this.D[2]] = [this.L[2], this.L[5], this.L[8]];
      [this.L[2], this.L[5], this.L[8]] = [a3, a2, a1];
    }
  }
  back(type) {
    if (type === "+") {
      this.B = this.plus(this.B);
      const [a1, a2, a3] = [this.U[0], this.U[1], this.U[2]];
      [this.U[0], this.U[1], this.U[2]] = [this.R[2], this.R[5], this.R[8]];
      [this.R[2], this.R[5], this.R[8]] = [this.D[8], this.D[7], this.D[6]];
      [this.D[6], this.D[7], this.D[8]] = [this.L[0], this.L[3], this.L[6]];
      [this.L[0], this.L[3], this.L[6]] = [a3, a2, a1];
    } else {
      this.B = this.minus(this.B);
      const [a1, a2, a3] = [this.U[0], this.U[1], this.U[2]];
      [this.U[0], this.U[1], this.U[2]] = [this.L[6], this.L[3], this.L[0]];
      [this.L[0], this.L[3], this.L[6]] = [this.D[6], this.D[7], this.D[8]];
      [this.D[6], this.D[7], this.D[8]] = [this.R[8], this.R[5], this.R[2]];
      [this.R[2], this.R[5], this.R[8]] = [a1, a2, a3];
    }
  }
  left(type) {
    if (type === "+") {
      this.L = this.plus(this.L); // ok
      const [a1, a2, a3] = [this.U[0], this.U[3], this.U[6]];
      [this.U[0], this.U[3], this.U[6]] = [this.B[8], this.B[5], this.B[2]];
      [this.B[2], this.B[5], this.B[8]] = [this.D[6], this.D[3], this.D[0]];
      [this.D[0], this.D[3], this.D[6]] = [this.F[0], this.F[3], this.F[6]];
      [this.F[0], this.F[3], this.F[6]] = [a1, a2, a3];
    } else {
      this.L = this.minus(this.L); // ok
      const [a1, a2, a3] = [this.U[0], this.U[3], this.U[6]];
      [this.U[0], this.U[3], this.U[6]] = [this.F[0], this.F[3], this.F[6]];
      [this.F[0], this.F[3], this.F[6]] = [this.D[0], this.D[3], this.D[6]];
      [this.D[0], this.D[3], this.D[6]] = [this.B[8], this.B[5], this.B[2]];
      [this.B[2], this.B[5], this.B[8]] = [a3, a2, a1];
    }
  }
  right(type) {
    if (type === "+") {
      this.R = this.plus(this.R);
      const [a1, a2, a3] = [this.U[2], this.U[5], this.U[8]];
      [this.U[2], this.U[5], this.U[8]] = [this.F[2], this.F[5], this.F[8]];
      [this.F[2], this.F[5], this.F[8]] = [this.D[2], this.D[5], this.D[8]];
      [this.D[2], this.D[5], this.D[8]] = [this.B[6], this.B[3], this.B[0]];
      [this.B[0], this.B[3], this.B[6]] = [a3, a2, a1];
    } else {
      this.R = this.minus(this.R);
      const [a1, a2, a3] = [this.U[2], this.U[5], this.U[8]];
      [this.U[2], this.U[5], this.U[8]] = [this.B[6], this.B[3], this.B[0]];
      [this.B[0], this.B[3], this.B[6]] = [this.D[8], this.D[5], this.D[2]];
      [this.D[2], this.D[5], this.D[8]] = [this.F[2], this.F[5], this.F[8]];
      [this.F[2], this.F[5], this.F[8]] = [a1, a2, a3];
    }
  }
  ans() {
    const a = [this.U[0], this.U[1], this.U[2]].join("");
    const b = [this.U[3], this.U[4], this.U[5]].join("");
    const c = [this.U[6], this.U[7], this.U[8]].join("");
    // console.log(this.U);
    // console.log(this.L);
    // console.log(this.F);
    // console.log(this.R);
    // console.log(this.B);
    // console.log(this.D);

    return [a, b, c].join("\n");
  }
}
const answer = [];
for (let tc = 0; tc < TC; tc++) {
  const qube = new Qube();
  const N = Number(initArr[tc * 2]);
  const commends = initArr[tc * 2 + 1];
  for (let i = 0; i < N; i++) {
    qube.run(commends[i]);
  }
  answer.push(qube.ans());
}
console.log(answer.join("\n"));
