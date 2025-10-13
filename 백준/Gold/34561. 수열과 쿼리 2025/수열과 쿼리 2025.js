const path = (process.platform === "linux" ? "/dev/stdin" : "input.txt");
const inputValue = require("fs").readFileSync(path).toString().trim();
const lines = inputValue.split('\n');

const N = Number(lines[0]);
const arr = lines[1].split(' ').map(Number);
const M = Number(lines[2]);

// Union-Find용 parent 배열
const parent = new Array(N).fill(0).map((_, i) => i);

// 값 -> 대표 인덱스 매핑
const valueToRep = new Map();

// Find with path compression
function find(x) {
    if(parent[x] !== x) {
        parent[x] = find(parent[x]);
    }
    return parent[x];
}

// Union
function union(x, y) {
    let rootX = find(x);
    let rootY = find(y);
    if(rootX !== rootY) {
        parent[rootX] = rootY;
    }
}

// 초기화: 각 값의 대표 인덱스 설정
for(let i = 0; i < N; i++) {
    const val = arr[i];
    if(!valueToRep.has(val)) {
        valueToRep.set(val, i);
    } else {
        // 같은 값이 이미 있으면 그 집합에 합치기
        union(i, valueToRep.get(val));
    }
}

const result = [];

for(let i = 3; i < 3 + M; i++) {
    const query = lines[i].split(' ').map(Number);
    
    if(query[0] === 1) {
        const [_, x, y] = query;
        
        // x 집합이 없으면 스킵
        if(!valueToRep.has(x)) continue;
        
        const xRep = find(valueToRep.get(x));
        
        if(!valueToRep.has(y)) {
            // y 집합이 없으면 x를 y로 변경
            valueToRep.set(y, xRep);
            valueToRep.delete(x);
            arr[xRep] = y;
        } else {
            // y 집합이 있으면 x를 y에 합치기
            const yRep = find(valueToRep.get(y));
            union(xRep, yRep);
            valueToRep.delete(x);
        }
    } else {
        const idx = query[1] - 1;
        const rep = find(idx);
        result.push(arr[rep]);
    }
}

console.log(result.join('\n'));