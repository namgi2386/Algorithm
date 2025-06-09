function solution(hp) {
    const a_ant = parseInt(hp / 5);
    const a_left = hp % 5;
    const b_ant = parseInt(a_left / 3);
    const c_ant = a_left % 3;
    return a_ant + b_ant + c_ant;
}