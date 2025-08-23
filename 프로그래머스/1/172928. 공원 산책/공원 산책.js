function solution(park, routes) {
    const sero = park.length
    const garo = park[0].length
    const isValid = (r,c) => {
        return 0<=r && r<sero && 0<=c && c<garo
    };
    const isBlocked = ( w,sr,sc,er,ec) => {
        console.log(w)
switch (w){
    case "S":
        console.log("?")
        for(let u=sr; u <= er; u++){
            if(park[u][sc]=== "X"){return false}
}
        break;
        case "N":
        for(let u=sr; u >= er; u--){if(park[u][sc]=== "X")return false
}
        break;
        case "E":
        for(let u=sc; u <= ec; u++){if(park[sr][u]=== "X")return false
}
        break;
        case "W":
        for(let u=sc; u >= ec; u--){if(park[sr][u]=== "X")return false
}
        break;
}
return true
}
    let pr = 0
    let pc = 0;
    park.forEach((stc,r)=>{
        stc.split("").forEach((stcc,c)=>{
if(stcc === "S"){
pr = r;
pc = c}})
    })
    console.log(pr,pc,"??")
    for(let i=0; i<routes.length; i++){
        let [d,w] = routes[i].split(" ");
        w = parseInt(w)
        let cr = pr
        let cc = pc
        switch(d){
            case "N": 
                cr -= w
                break;
            case "S":
                cr += w
                break;
            case "E":
                cc += w
                break;
            case "W":
                cc -= w
                break;
        }
        if(isValid(cr,cc) && isBlocked(d,pr,pc,cr,cc)){
            pr = cr
            pc = cc
        }
        console.log(sero,garo,d,w,pr,pc,cr,cc)
    };
    
    return [pr,pc];
}