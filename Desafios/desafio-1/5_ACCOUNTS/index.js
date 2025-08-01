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
        console.log(`Voce selecionou a opcao ${action}`)
    })
    .catch((err => console.log(err)))
}