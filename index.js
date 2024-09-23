#!/usr/bin/env node

const {Command} = require('commander');
const chalk = require('chalk');

//Function to generate password

function generatePassword(length, includeNumbers, includeUppercase, includeSymbols) {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const symbols = `!@#$%^&*()_+[]{}|;:,.<>?`;

  let characters = lowercase;

  if (includeNumbers) characters += numbers;
  if (includeUppercase) characters += uppercase;
  if (includeSymbols) characters += symbols;

  let password = '';
  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return password;
}

//Setup CLI using commander

const program = new Command();

program
.name('password-generator-cli')
.description('CLI to generate passwords with customizable options')
.version('1.0.0')
.option('-1, --length <number>', 'length of the password', '8')
.option('-n, --numbers', 'include numbers in the password')
.option('-u, --uppercase', 'include uppercase letters in the password')
.option('-s, --symbols', 'include symbols in the password')
.helpOption('-h, --help', 'display help for command')
.action((option) => {
  const length = parseInt(options.length, 10);
  if (isNaN(length) || length <1) {
    console.log(chalk.red('Error: Length must be a positive number.'));
    process.exit (1);
  }

  const password = generatePassword(
    length,
    options.numbers || false,
    options.uppercase || false,
    options.symbols || false
  );

  console.log(chalk.green(`Generate password:${password}`));

});

program.parse();
