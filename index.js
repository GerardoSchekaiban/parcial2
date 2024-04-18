#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';


let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    'How well do you know me? \n'
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue('HOW TO PLAY')} 
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed('killed')}
    So get all the questions right...

  `);
}

async function askName() {
    const answers = await inquirer.prompt({
      name: 'player_name',
      type: 'input',
      message: 'What is your name?',
      default() {
        return 'Player';
      },
    });
  
    playerName = answers.player_name;
  }

  async function question1() {
    const answers = await inquirer.prompt({
      name: 'Question1',
      type: 'list',
      message: 'What is my favorite sport? \n',
      choices: [
        'Tennis',
        'padel',
        'Volleyball',
        'Basketball',
      ],
    });
  
    return handleAnswer(answers.question1 === 'Tennis');
  }

  async function question2() {
    const answers = await inquirer.prompt({
      name: 'Question2',
      type: 'list',
      message: 'What is my favorite childhood movie? \n',
      choices: [
        'Toy Story',
        'The Incredibles',
        'Cars',
        'Avengers',
      ],
    });
  
    return handleAnswer(answers.question2 === 'Cars 2');
  }

  async function question3() {
    const answers = await inquirer.prompt({
      name: 'Question3',
      type: 'list',
      message: 'What is my favorite artist? \n',
      choices: [
        'Mana',
        'Michael Jackson',
        'Michael Buble',
        'Myke Towers',
      ],
    });
  
    return handleAnswer(answers.question3 === 'Michael Jackson');
  }

  async function question4() {
    const answers = await inquirer.prompt({
      name: 'Question4',
      type: 'list',
      message: 'What is my favorite mexican soccer team? \n',
      choices: [
        'America',
        'Chivas',
        'Tigres',
        'Cruzazul',
      ],
    });
  
    return handleAnswer(answers.question4 === 'Cruzazul');
  }

  async function question5() {
    const answers = await inquirer.prompt({
      name: 'Question5',
      type: 'list',
      message: 'What is my favorite console? \n',
      choices: [
        'Xbox',
        'Nintendo Switch',
        'Play Station',
        'GameBoy',
      ],
    });
  
    return handleAnswer(answers.question5 === 'Xbox');
  }


  async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();
  
    if (isCorrect) {
      spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
    } else {
      spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
      process.exit(1);
    }
  }

  function winner() {
    console.clear();
    figlet(`Congrats , ${playerName} !`, (err, data) => {
      console.log(gradient.pastel.multiline(data) + '\n');

      console.log(
        chalk.green(
          `I owe you your favorite thing in the world`
        )
      );
  
      process.exit(0);
    });
  }

console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();
