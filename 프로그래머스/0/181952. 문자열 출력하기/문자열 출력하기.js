const readlinetemp = require('readline');
const rltemp = readlinetemp.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inputtemp = [];

rltemp.on('line', function (linetemp) {
    inputtemp = [linetemp];
}).on('close',function(){
    const str = inputtemp[0];
    console.log(str);
});