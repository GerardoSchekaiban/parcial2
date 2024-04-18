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
      message: 'What is my favorite type of food? \n',
      choices: [
        'Mexican',
        'German',
        'Italian',
        'Russian',
      ],
    });
  
    return handleAnswer(answers.question1 === 'Mexican');
  }

  async function question2() {
    const answers = await inquirer.prompt({
      name: 'Question2',
      type: 'list',
      message: 'What is my favorite Tennis player? \n',
      choices: [
        'Nadal',
        'Roger Federer',
        'Novak',
        'Thiem',
      ],
    });
  
    return handleAnswer(answers.question2 === 'Roger Federer');
  }

  async function question3() {
    const answers = await inquirer.prompt({
      name: 'Question3',
      type: 'list',
      message: 'What is my favorite color? \n',
      choices: [
        'Blue',
        'Red',
        'Black',
        'Yellow',
      ],
    });
  
    return handleAnswer(answers.question3 === 'Blue');
  }

  async function question4() {
    const answers = await inquirer.prompt({
      name: 'Question4',
      type: 'list',
      message: 'Do I like going to the gym? \n',
      choices: [
        'No',
        'Sometimes',
        'Yes, of course',
        'I hate it',
      ],
    });
  
    return handleAnswer(answers.question4 === 'Cruzazul');
  }

  async function question5() {
    const answers = await inquirer.prompt({
      name: 'Question5',
      type: 'list',
      message: 'What is my favorite programming language? \n',
      choices: [
        'JavaScript',
        'Python',
        'C',
        'Java',
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
