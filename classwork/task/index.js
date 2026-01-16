console.log("==========Calculator==========");

// console.log(window); // this will give error as window is not defined in node environment, it works only in browser environment

const { add, subtract, multiply, divide } = require("./operations");

// let a = 20;
// let b = 4;

// Using readline module to take input from user
const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter first number: ", (firstInput) => {
  rl.question("Enter second number: ", (secondInput) => {
    const a = parseFloat(firstInput);
    const b = parseFloat(secondInput);

    // Addition
    console.log(`\nAddition of ${a} and ${b} is: ${add(a, b)}`);

    // Subtraction
    console.log(`Subtraction of ${a} and ${b} is: ${subtract(a, b)}`);

    // Multiplication
    console.log(`Multiplication of ${a} and ${b} is: ${multiply(a, b)}`);

    // Division
    console.log(`Division of ${a} and ${b} is: ${divide(a, b)}`);

    rl.close();
  });
});
