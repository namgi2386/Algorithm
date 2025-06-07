require('readline').createInterface({
input : process.stdin,
output : process.stdout}).on('line' , li => {
    const a = li%2 ? 'is odd' : 'is even';
    console.log(`${li} ${a}`);
});