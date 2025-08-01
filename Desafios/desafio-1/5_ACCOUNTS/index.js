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

        } else if (action === 'Consultar saldo') {
            getAccountBalance()
            
        } else if (action === 'Depositar') {
            deposit()

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

// Add an amount to user account
function deposit() {

    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'

        }
    ])
    .then((answer) => {
        const accountName = answer['accountName']

        // Verify if account exists
        if(!checkAccount(accountName)) {
            return deposit()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto voce deseja depositar?'
            }
        ])
        .then((answer) => {
            const amount = answer['amount']

            // Add an amount
            addAmount(accountName, amount)
            operation()
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

// Verify if account exists
function checkAccount(accountName) {
    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black('Esta conta nao existe. Escolha outro nome!'))
        return false
    }

    return true
}

function addAmount(accountName, amount) {

    const accountData = getAccount(accountName)

    if (!amount) {
        console.log(chalk.bgRed.black('Ocorreu um erro. Tente novamente mais tarde!'))
        return deposit()
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    // Salvando os dados no banco (arquivo)
    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err) {
            console.log(err)
        }
    )

    console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta!`))

}

function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r' 
    })

    return JSON.parse(accountJSON)
}

// Show account balance
function getAccountBalance() {

    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'
        }
    ])
    .then((answer) => {
        const accountName = answer['accountName']

        // Verify of account exists
        if(!checkAccount(accountName)) {
            return getAccountBalance()
        }

        const accountData = getAccount(accountName)

        console.log(chalk.bgBlue.black(`Ola! O saldo de sua conta é de R$${accountData.balance}`))

        operation()
    })
    .catch((err => console.log(err)))
}