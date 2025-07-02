process.stdin.setEncoding('utf8');
process.stdin.on('data', data => {
    const n = data.split(" ");
    const a = Number(n[0]), b = Number(n[1]);
    const st = Array.from({length:a}).fill('*').join('')
    for(let i=0;i<b;i++){
        console.log(st)
    }
});