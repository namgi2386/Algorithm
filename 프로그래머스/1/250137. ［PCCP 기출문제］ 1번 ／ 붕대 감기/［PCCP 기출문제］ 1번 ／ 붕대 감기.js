function solution(bandage, health, attacks) {
  console.log(bandage, health, attacks);
  let [tic, jap, hook] = bandage;
  let point = health;
  let time = 1;
  let check = 0;
  for (let info of attacks) {
    let [t, a] = info;
    while (time < t) {
      // 공격전
      if (point < health) {
        // 풀피아님
        point += jap; // 밥먹기
        check++;
        if (check === tic) {
          point += hook; // 최대 연속 판단
          check = 0;
        }
        if (point >= health) {
          point = health; // 넘으면 최대치로
          check = 0;
        }
      } else {
        point = health; // 이미 풀피
        check = 0;
      }
      console.log("시간 : ", time, "초(", point, ")점(", check, ")");
      time++;
    }
    if (time === t) {
      // 공격시
      point -= a;
      if (point <= 0) {
        return -1;
      }
      check = 0;
    }
    console.log("시간 : ", time, "초(", point, ")점(", check, ")");
    time++;
  }
  return point;
}