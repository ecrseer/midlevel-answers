const reader = require("readline");

class TestUtils {
  investmentReturn(initialCapital, interestRate, months) {
    let percentage = interestRate * 0.01 + 1;
    let totalInvestment = initialCapital;
    for (let ii = 1; ii <= months; ii++) {
      totalInvestment = totalInvestment * percentage;
    }
    return totalInvestment;
  }

  vowelCounter(sentence) {
    let counter = 0;
    const vowels = ["a", "e", "i", "o", "u"];
    for (let letter of sentence.split("")) {
      if (vowels.includes(letter.toLowerCase())) {
        counter++;
      }
    }
    return counter;
  }

  gradeAverage(subjects) {
    function subjectAverage(subject) {
      const sum = subject.grades.reduce((acc, curr) => (acc = acc + curr));
      return sum / subject.grades.length;
    }
    return subjects.map((subject) => {
      const avg = subjectAverage(subject);

      return {
        name: subject.name,
        avg,
      };
    });
  }

  simpleCalculator(numberVal, operator, otherNumberVal) {
    switch (operator) {
      case "+": {
        return numberVal + otherNumberVal;
      }
      case "-": {
        return numberVal - otherNumberVal;
      }
      case "*": {
        return numberVal * otherNumberVal;
      }
      case "/": {
        return numberVal / otherNumberVal;
      }
      default: {
        return null;
      }
    }
  }

  isPrimeNumber(numberVal) {
    for (let ii = 2; ii < numberVal; ii++) {
      if (numberVal % ii === 0) return false;
    }
    return true;
  }

  getFactorialFrom(factorialNumber) {
    let sum = 1;
    for (let factorial = factorialNumber; factorial > 0; factorial--) {
      sum = sum * factorial;
    }
    return sum;
  }

  isPalindrome(word) {
    const reversedWord = word.split("").reverse().join("");
    if (reversedWord === word) {
      return true;
    }
    return false;
  }

  getNumberTable(numberVal) {
    for (let table = 1; table <= 10; table++) {
      console.log(`${numberVal}x${table}=${table * numberVal}`);
    }
  }
}

class MidLevelTest {
  constructor() {
    this.readline = reader.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.utils = new TestUtils();
  }

  askQuestion(theQuestion) {
    return new Promise((resolve) =>
      this.readline.question(theQuestion, (answ) => resolve(answ))
    );
  }

  async run() {
    const answer = await this.askQuestion(
      `\n------------- \n
      Select an exercise by number: \n
      Exercise (1): Simple Calculator\n
      Exercise (2): Prime Numbers\n
      Exercise (3): Factorial\n
      Exercise (4): Palindrome\n
      Exercise (5): Table\n
      Exercise (6): Vowel Counter\n
      Exercise (7): Grade Average\n
      Exercise (8): Interest Calculation\n
      --------------\n`
    );
    try {
      const numberVal = +answer;
      await this[`exercise${numberVal}`]();
    } catch {
      console.log("sorry,try again");
    }
    this.run();
  }

  async exercise1() {
    const valOne = await this.askQuestion("Write an number\n");

    const operator = await this.askQuestion(
      "Select an operator :  + or - or * or / \n"
    );
    const valTwo = await this.askQuestion("Write another number\n");

    try {
      const result = this.utils.simpleCalculator(+valOne, operator, +valTwo);
      console.log(`the result is ${result}`);
    } catch {
      console.log("sorry, try again");
    }
  }
  async exercise2() {
    const answer = await this.askQuestion(
      "Write an number to check if is prime\n"
    );
    try {
      if (this.utils.isPrimeNumber(+answer)) {
        console.log("it is a prime number");
      } else {
        console.log("it NOT prime");
      }
    } catch {
      console.log("sorry, try again");
    }
  }
  async exercise3() {
    const answer = await this.askQuestion(
      "Write a number to check its factorial result \n"
    );
    try {
      const factorial = this.utils.getFactorialFrom(+answer);
      console.log(`its factorial its ${factorial}`);
    } catch {
      console.log("sorry, try again");
    }
  }
  async exercise4() {
    const answer = await this.askQuestion(
      "Write an word to checks if is a palindrome\n"
    );
    try {
      if (this.utils.isPalindrome(answer)) {
        console.log("it is a palindrome");
      } else {
        console.log("it NOT a palindrome");
      }
    } catch {
      console.log("sorry, try again");
    }
  }
  async exercise5() {
    const answer = await this.askQuestion(
      "Write a number to displays its table \n"
    );
    try {
      this.utils.getNumberTable(+answer);
    } catch {
      console.log("sorry, try again");
    }
  }
  async exercise6() {
    const answer = await this.askQuestion(
      "Write an sentence to count its vowels \n"
    );
    try {
      const count = this.utils.vowelCounter(answer);
      console.log(`this sentence has ${count} vowels`);
    } catch {
      console.log("sorry, try again");
    }
  }

  async getSubjectInfo() {
    const subject = {
      name: "",
      grades: [],
    };
    const name = await this.askQuestion(
      "What subject do you wanna register? \n"
    );
    for (let ii = 1; ii <= 3; ii++) {
      const grade = await this.askQuestion(
        `what was your ${ii} grade in this subject? \n`
      );
      subject.grades.push(+grade);
    }
    subject.name = name;
    return subject;
  }

  async exercise7() {
    const subjects = [];
    for (let ii = 0; ii < 3; ii++) {
      const subject = await this.getSubjectInfo();
      subjects.push(subject);
    }

    try {
      const averages = this.utils.gradeAverage(subjects);
      console.log(`your averages are:\n`);
      console.log(averages);
    } catch {
      console.log("sorry, try again");
    }
  }

  async exercise8() {
    try {
      const capital = await this.askQuestion("What is your initial capital?\n");
      const interest = await this.askQuestion("What is the interest rate? \n");
      const months = await this.askQuestion(
        "How many months you plan to keep it there? \n"
      );

      const totalInvestment = this.utils.investmentReturn(
        +capital,
        +interest,
        +months
      );
      console.log(`your final value will be: ${totalInvestment}\n`);
    } catch {
      console.log("sorry, try again");
    }
  }
}
const test = new MidLevelTest();
test.run();
