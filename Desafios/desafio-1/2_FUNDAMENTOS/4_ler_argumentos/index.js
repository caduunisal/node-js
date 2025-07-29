
// Input => node index.js nome=carlos idade=47

console.log(process.argv)

const args = process.argv.slice(2)

console.log(args)
const nome = args[0].split("=")[1]
const idade = args[1].split("=")[1]

console.log(nome)
console.log(idade)

console.log(`O nome dele e ${nome} e ele tem ${idade} anos!`)