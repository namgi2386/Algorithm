require('readline').createInterface({
    input : process.stdin,
    output : process.stdout
}).on('line', li => {
    let a = '';
    li.split(' ').map(b => a+=b );
    console.log(a);
})