const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * @param {string} query string asking user for the question
 * @returns promise with the input value
 */

const question = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

/**
 * @param {string} query string asking user for the question
 * @param {Function} validate function to validate the input
 * @returns promise with the answer
 */

const askQuestion = async (query, validate) => {
  let answer;
  do {
    answer = await question(query);
    if (!validate || validate(answer)) break;
    console.log("Invalid input, please try again.");
  } while (true);
  return answer;
};

module.exports = { question, askQuestion, rl };
