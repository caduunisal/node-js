const inquirer = require('inquirer')

async function main() {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Qual seu nome? '      
            },
            {
                type: 'input',
                name: 'age',
                message: 'Qual sua idade? '
            }
        ]);

        console.log(`Nome: ${answers.name} Idade: ${answers.age}`)

    } catch (err) {
        console.log(`Erro: ${err}`);
    }
}

main();