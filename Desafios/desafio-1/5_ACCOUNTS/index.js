// Modulos externos
const chalk = require('chalk')
const inquirer = require('inquirer')

// Modulos internos
const fs = require('fs')

operation()

function operation() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que voce deseja fazer?',
            choices: [
                'Criar conta',
                'Consultar saldo',
                'Depositar',
                'Sacar',
                'Sair'
            ]
        }
    ])
    .then((answer) => {
        const action = answer['action']
        // console.log(`Voce selecionou a opcao ${action}`)
        if (action === 'Criar conta') {
            creatAccount()
        } else if (action === 'Consultar Saldo') {

        } else if (action === 'Depositar') {

        } else if (action === 'Sacar') {

        } else if (action === 'Sair') {
            console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'))
            process.exit()
        }
    })
    .catch((err => console.log(err)))
}

function creatAccount() {
    console.log(chalk.bgGreen.black('Parabens por escolher o nosso banco!'))
    console.log(chalk.green("Defina as opcoes da sua conta a seguir"))

    buildAccount()
}

function buildAccount() {

    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite um nome para a sua conta:' 
        }
    ]).then(answer => {
        const accountName = answer['accountName']
        console.info(accountName)

        if(!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts')
        }

        if(fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk.bgRed.black('Esta conta ja existe. Escolha outro nome!'))
            buildAccount()
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json`, 
            '{"balance": 0}', 
            function (err) {
                console.log(err)
            },
                    
        )

        console.log(chalk.green('Parabens! A sua conta foi criada!'))
        operation()

    })
    .catch(err => console.log(err))
}