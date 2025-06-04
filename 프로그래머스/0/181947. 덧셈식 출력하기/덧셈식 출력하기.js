require('readline').createInterface({
input : process.stdin,
output : process.stdout}).on('line' , li => {
    const [sa,sb] = li.split(' ');
    const a = Number(sa);
    const b = Number(sb)
    console.log(`${a} + ${b} = ${a+b}`)
})