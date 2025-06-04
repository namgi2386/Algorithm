require('readline').createInterface({
    input : process.stdin,
    output : process.stdout
}).on('line' , line => {
    let value ='';
    for(let i=0; i < line.length ; i++){
        if(line[i] === line[i].toUpperCase()){
            value += line[i].toLowerCase();
        } else {
            value += line[i].toUpperCase();
        }
    }
    console.log(value);
})