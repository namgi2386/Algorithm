function solution(id_pw, db) {
    for(c of db){
        if(c[0] === id_pw[0]){
            if(c[1] === id_pw[1]){
                return "login";
            } else {
                return "wrong pw"
            };
        };
    };
    return "fail";
}