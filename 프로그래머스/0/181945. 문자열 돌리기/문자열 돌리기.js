require('readline').createInterface({
input : process.stdin,
output: process.stdout}).on('line' , li => {
    li.split('').map((a,b,c)=>console.log(a))
})