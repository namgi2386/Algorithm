const fs = require("fs");
// const inputValue = fs.readFileSync("input.txt").toString().trim();
const inputValue = fs.readFileSync("/dev/stdin").toString().trim();

let arr = inputValue.split("");
let isOpened = false;
let stack = 0;
let answer = 0;
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === "(") {
    isOpened = true;
    stack++;
  } else {
    if (isOpened) {
      // () 일때
      stack--;
      answer += stack;
      isOpened = false 
    } else {
      // )) 일때
      answer++;
      stack--;
    }
  }
}
console.log(answer);
//     ()   ()()      ()   ()       () ()
//        (      )  (    )        
//   (             )
// (                          )
//(                            )  (       )



//    (( ( () ( ()() ) )( () ) () ))  ( () () )
//         3 
//             4  4  1 1 
//                        3  1 2  11   1   1  1 
// 24