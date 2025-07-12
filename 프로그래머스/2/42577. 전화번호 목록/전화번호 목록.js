function solution(phone_book) {
    let map = new Map();
    for(c of phone_book){
        map.set(c,'');
    }
    for(c of phone_book){
        for(let i=1;i<c.length;i++){
            if(map.has(c.slice(0,i))) return false
        }
    }
    return true;
}