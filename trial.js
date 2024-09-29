const a = [1,2,3,4]

a.splice(1,1)

const date = new Date()
const month = date.toLocaleString('default', { month: 'long' });
console.log(month);