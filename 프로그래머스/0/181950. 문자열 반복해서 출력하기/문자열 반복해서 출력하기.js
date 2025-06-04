const rl = require('readline').createInterface({
    input : process.stdin,
    output : process.stdout
}).on('line', line => {
    const [a,b] = line.split(' ');
    const result = a;
    const n = Number(b)
    console.log(a.repeat(n));
})