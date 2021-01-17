# Testing-nodejs-backend
__Table of Contents__

[Introduction](#introduction)

[Setup](#setup)

[Chapter 1 - TDD](#chapter-1--tdd)

- [Exercise 1.1: Hello Calculator](#-exercise-11-hello-calculator)
- [Exercise 1.2: Test more efficient - Property based testing](#-exercise-12-test-more-efficient)
- [Exercise 1.3: Test exceptional scenario as well](#-exercise-13-test-exceptional-scenario-as-well)

#  Introduction

To share what have I been using to test Node.js Backend Application and some of the useful node library. Some of the concepts such as Unit Testing will not be covered.

#  Setup

##  Setting up the project

- Fork this repository (https://github.com/bendanye/testing-nodejs-backend.git) and clone it to your fork of the repository
- Run `npm install` to to install the project dependencies.

##  Setting up folders for the project

Now, let's setup the project to run some tests.

Create a folder called `/src` for your source codes.

Create a folder called `/test` for your test codes.

**Question**: Why is it structure this way? Is this recommend approach? Some projects placed their test codes in the same folder as the source codes

**Answer**: No right and wrong answer. For me is when building for docker image, I prefer to exclude `/test` rather than excluding "test.js". The advice I will give is be consistent and follow the team or project practices. 

###  What is Jest?

We are going to setup Jest to run our tests.

[Jest](https://jestjs.io/) is a Javascript testing library, it helps you to manage the setup, execution, teardown and reporting of your tests.

###  Seting up Jest

- Install [Jest](https://jestjs.io/).


```
npm install jest --save-dev
```

- Set up your `test` script in `package.json` like this:


```json
{
    "scripts": {
        "test": "jest --rootDir=test"
    }
}
```



- Create ` jest.config.js` and type like this:

```json
module.exports = {
    testRegex: '.*.test.js',
};
```



This will tell Jest to execute all tests that ends with ".test.js" under test folder.

#  Chapter 1 : TDD

Let's start with writing the first test in this exercise using TDD.

##  What is TDD?

[Test Driven Development (TDD)](https://en.wikipedia.org/wiki/Test-driven_development) is software development approach in which test cases are developed first to specify and validate what the actual production code will do.

###  Exercise 1.1: Hello Calculator

In this exercise, we are going to try using TDD to write the code for the `Calculator` class in `src/calculator.js`. Let's test the `add` method.

1. Create the file calculator.test.js in` tests` folder.

2. Use `describe` to create a test suite for the `calculator` class and for the `add` method, to group related tests:

   ```javascript
   describe("calculator", function() {
       describe("add()", function() {
           // We'll write our test cases here
       })
   })
   ```

3. Create your first test case, able to add two numbers and get expected result

   ```javascript
   describe("calculator", function() {
       describe("add()", function() {
           // We'll write our test cases here
           test('should pass', () => {
               expect(add(1,1)).toBe(2);
           });
       })
   })
   ```

4. In your terminal, run `npm test`. You should see 1 out of 1 test cases failed

   Test Suites: 1 failed, 1 total
   Tests:       1 failed, 1 total

5. You must be wondering, "huh, where the add function". This is TDD when you need to change red to green. Now you need to create the basic add() function in order to pass this test case.

6. Create the `calculator.js` in src folder and add the following lines of code:

   ```javascript
   const add = (x, y) => {
       return x + y
   };
   
   module.exports = {
       add
   }
   ```

7. Import the calculator class in the `test/calculator.js`:

   ```javascript
   const {add} = require("../src/calculator")
   ```

8. In your terminal, run `npm test`. You should see 1 out of 1 test cases failed

    PASS  test/calculator.test.js
     calculator
       add()
         √ should pass (3 ms)

   Test Suites: 1 passed, 1 total
   Tests:       1 passed, 1 total

###  Exercise 1.2: Test more efficient - Property based testing

In this exercise, we are going to try a concept called [Property-based Testing](https://techbeacon.com/app-dev-testing/how-make-your-code-bulletproof-property-testing#:~:text=What%20is%20property%2Dbased%20testing,that%20you%20want%20to%20test.) to test more efficient for the add() function. Before that let's test more on the `add` method.

1. Add more test cases you can think of for the add().

   ```javascript
   describe("calculator", function() {
       describe("add()", function() {
           // We'll write our test cases here
           test('tc1 - should pass', () => {
               expect(add(1,1)).toBe(2);
           });
           
           test('tc2 - should pass', () => {
               expect(add(2,10)).toBe(12);
           });
           
           test('tc3 - should pass', () => {
               expect(add(30,100)).toBe(130);
           });
       })
   })
   ```

   Test Suites: 1 passed, 1 total
   Tests:       3 passed, 3 total

2. Do you think this is efficient to test many scenario? Probably not. Let try another approach to test this, using Fast-check! 

3. Install [Fast-check](https://github.com/dubzzz/fast-check) and [Jest-Fast-check](https://www.npmjs.com/package/jest-fast-check)

   ```
   npm install --save-dev fast-check jest-fast-check
   ```

4. Add and remove the codes in `calculator.test.js`

   ```javascript
   const {add} = require('../src/calculator')
   
   const { testProp, fc } = require('jest-fast-check');
   
   describe("calculator", function() {
       describe("add()", function() {
           // We'll write our test cases here
           testProp('should ensure random test data', [fc.integer(0, 1000), fc.integer(0, 1000)], (a,b) => {
               const expectedResult = a + b;
               console.log(a, b)
               expect(add(a, b)).toBe(expectedResult)
             });
           
       })
   })
   ```

   console.log
       607 19

         at calculator.test.js:10:21

     console.log
       130 865

         at calculator.test.js:10:21

   Test Suites: 1 passed, 1 total
   Tests:       1 passed, 1 total

   

   You can see it will random generating test data and number of test cases. More efficient right?

###  Exercise 1.3: Test exceptional scenario as well

In this exercise, we are going to test more on the `add` method. Can you think of what are the exceptional scenario that will happen in add() method?

1. Add more test cases you can think of for the add() and rerun the test

```javascript

describe("calculator", function() {
    describe("add()", function() {
        // We'll write our test cases here
        testProp('should ensure random test data', [fc.integer(0, 1000), fc.integer(0, 1000)], (a,b) => {
            const expectedResult = a + b;
            console.log(a, b)
            expect(add(a, b)).toBe(expectedResult)
          });
        
        test('Should failed due to number as string', () => {
            expect(add("1", "2")).toBe(3)
        })
        
    })
})
```

 Expected: 3
 Received: "12"

The result from 1+2 = "12"? Why!!!?? Because we are adding two string instead of numbers! Now ask yourself this question. Should the add() validate and reject if the input parameters are string instead of numbers? Depends on the business needs. For this example, let assume we will accept strings as input parameters and convert them to numbers

2. Add the conversion inside `src/calculator.js` and rerun the test cases.

   ```javascript
   const add = (x, y) => {
       const newX = new Number(x);
       const newY = new Number(y);
       return newX + newY
   };
   ```

All test cases are passed now! Of course there are other exceptional scenario that can happened like what is the x value is null and etc but we are not going to there. Key thing is remind the developer that always think of possible exception scenario. :D





   

