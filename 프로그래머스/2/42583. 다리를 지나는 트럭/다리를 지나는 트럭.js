function solution(bridge_length, weight, truck_weights) {
    let queue = Array(bridge_length).fill(0)
    let w = 0;
    let timer = 0;
    while(truck_weights.length >0 || w != 0){
        if(w+truck_weights[0] - queue[0] <= weight){
            const tc = queue.shift();
            const tr = truck_weights.shift();
            queue.push(tr)
            w+= (tr - tc )          
        } else {
            const tc = queue.shift();
            queue.push(0)
            w-=tc
        }
        timer++;
    }
    
    return timer;
}