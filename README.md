# Testing-nodejs-backend

**Table of Contents**
- [Introduction](#introduction)
- [Setup](#setup)
  - [Setting up the project](#setting-up-the-project)
  - [Setting up folders for the project](#setting-up-folders-for-the-project)
    - [What is Jest?](#what-is-jest)
    - [Seting up Jest](#seting-up-jest)
- [Chapter 1 : TDD](#chapter-1--tdd)
  - [What is TDD?](#what-is-tdd)
    - [Exercise 1.1: Hello Calculator](#exercise-11-hello-calculator)
    - [Exercise 1.2: Test more efficient - Property based testing](#exercise-12-test-more-efficient---property-based-testing)
    - [Exercise 1.3: Test exceptional scenario as well](#exercise-13-test-exceptional-scenario-as-well)
- [Chapter 2 : API Testing](#chapter-2--api-testing)
    - [Exercise 2.1: Setup Hello API](#exercise-21-setup-hello-api)
    - [Exercise 2.2: Mocking function](#exercise-22-mocking-function)
    - [Exercise 2.3: Integration Testing with Jest-testcontainers](#exercise-23-integration-testing-with-jest-testcontainers)
      - [Why use Testcontainers instead of mocking?](#why-use-testcontainers-instead-of-mocking)
      - [Testcontainers vs Docker-Compose](#testcontainers-vs-docker-compose)
    - [Exercise 2.4: Testing API without starting server - SuperTest](#exercise-24-testing-api-without-starting-server---supertest)
      - [Current limitations of existing tests](#current-limitations-of-existing-tests)
    - [Exercise 2.5: API Testing using Postman and Newman](#exercise-25-api-testing-using-postman-and-newman)
      - [Exercise 2.5.1 Create Collection](#exercise-251-create-collection)
      - [Exercise 2.5.2 Create folder](#exercise-252-create-folder)
      - [Exercise 2.5.3 Create environment](#exercise-253-create-environment)
      - [Exercise 2.5.4 Create request](#exercise-254-create-request)
      - [Exercise 2.5.5 Add assertions into request for testing](#exercise-255-add-assertions-into-request-for-testing)
      - [Exercise 2.5.6 Use runner to run all the requests](#exercise-256-use-runner-to-run-all-the-requests)
      - [Exercise 2.5.7 Export collection](#exercise-257-export-collection)
      - [Exercise 2.5.8 Import collection](#exercise-258-import-collection)
      - [Exercise 2.5.9 Export environment](#exercise-259-export-environment)
      - [Exercise 2.5.10 Newman](#exercise-2510-newman)
      - [Question: SuperTest vs Newman](#question-supertest-vs-newman)
- [Chapter 3 : Every small little things to improve your testing](#chapter-3--every-small-little-things-to-improve-your-testing)
    - [Exercise 3.1: Treat your test codes as production codes](#exercise-31-treat-your-test-codes-as-production-codes)
    - [Exercise 3.2: Display Test Result in HTML Reporting](#exercise-32-display-test-result-in-html-reporting)
    - [Exercise 3.3: ESlint + Prettier](#exercise-33-eslint--prettier)
    - [Exercise 3.4: Code Coverage - To see if your tests are testing your codes](#exercise-34-code-coverage---to-see-if-your-tests-are-testing-your-codes)
    - [Exercise 3.5: Eslint with Jest to ensure your tests are asserting test result](#exercise-35-eslint-with-jest-to-ensure-your-tests-are-asserting-test-result)
    - [Exercise 3.6: Tag your tests](#exercise-36-tag-your-tests)
    - [Exercise 3.7: Mutation Testing - Advanced technique to check your tests' effectiveness](#exercise-37-mutation-testing---advanced-technique-to-check-your-tests-effectiveness)
      - [Why 100% Code Coverage is not a good indicator](#why-100-code-coverage-is-not-a-good-indicator)
      - [Why Mutation Testing](#why-mutation-testing)
- [Chapter 4 : Improve your productivity and coding](#chapter-4--improve-your-productivity-and-coding)
    - [Exercise 4.1: Useful Vscode Extensions](#exercise-41-useful-vscode-extensions)
    - [Exercise 4.2: Auto-format your code upon saving](#exercise-42-auto-format-your-code-upon-saving)
    - [Exercise 4.3: Automated Pre-commit Run Check using Husky and Lint-staged](#exercise-43-automated-pre-commit-run-check-using-husky-and-lint-staged)
    - [Exercise 4.4: Use Code Snippet to reduce duplicate typing of codes](#exercise-44-use-code-snippet-to-reduce-duplicate-typing-of-codes)
    - [Exercise 4.5: Check your dependencies with dependency-cruiser](#exercise-45-check-your-dependencies-with-dependency-cruiser)
    - [Exercise 4.6: Duplicate code check using JSCPD](#exercise-46-duplicate-code-check-using-jscpd)
    - [Exercise 4.7: View Code Complexity](#exercise-47-view-code-complexity)
- [Disclaimer](#disclaimer)

# Introduction

To share what have I been using to test Node.js Backend Application and some of the useful node library. Some of the concepts such as Unit Testing will not be covered.

# Setup

## Setting up the project

- Fork this repository (https://github.com/bendanye/testing-nodejs-backend.git) and clone it to your fork of the repository
- Run `npm install` to to install the project dependencies.

## Setting up folders for the project

Now, let's setup the project to run some tests.

Create a folder called `/src` for your source codes.

Create a folder called `/test` for your test codes.

**Question**: Why is it structure this way? Is this recommend approach? Some projects placed their test codes in the same folder as the source codes

**Answer**: No right and wrong answer. For me is when building for docker image, I prefer to exclude `/test` rather than excluding "test.js". The advice I will give is be consistent and follow the team or project practices.

### What is Jest?

We are going to setup Jest to run our tests.

[Jest](https://jestjs.io/) is a Javascript testing library, it helps you to manage the setup, execution, teardown and reporting of your tests.

### Seting up Jest

- Install [Jest](https://jestjs.io/).

```
npm install jest --save-dev
```

- Set up your `test` script in `package.json` like this:

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

- Create `jest.config.js` and type like this:

```json
module.exports = {
    testRegex: '.*.test.js',
};
```

This will tell Jest to execute all tests that ends with ".test.js" under test folder.

# Chapter 1 : TDD

Let's start with writing the first test in this exercise using TDD.

## What is TDD?

[Test Driven Development (TDD)](https://en.wikipedia.org/wiki/Test-driven_development) is software development approach in which test cases are developed first to specify and validate what the actual production code will do.

### Exercise 1.1: Hello Calculator

In this exercise, we are going to try using TDD to write the code for the `Calculator` class in `src/calculator.js`. Let's test the `add` method.

1. Create the file calculator.test.js in`tests` folder.

2. Use `describe` to create a test suite for the `calculator` class and for the `add` method, to group related tests:

   ```javascript
   describe("calculator", function() {
     describe("add()", function() {
       // We'll write our test cases here
     });
   });
   ```

3. Create your first test case, able to add two numbers and get expected result

   ```javascript
   describe("calculator", function() {
     describe("add()", function() {
       // We'll write our test cases here
       test("should pass", () => {
         expect(add(1, 1)).toBe(2);
       });
     });
   });
   ```

4. In your terminal, run `npm test`. You should see 1 out of 1 test cases failed

   Test Suites: 1 failed, 1 total
   Tests: 1 failed, 1 total

5. You must be wondering, "huh, where the add function". This is TDD when you need to change red to green. Now you need to create the basic add() function in order to pass this test case.

6. Create the `calculator.js` in src folder and add the following lines of code:

   ```javascript
   const add = (x, y) => {
     return x + y;
   };

   module.exports = {
     add,
   };
   ```

7. Import the calculator class in the `test/calculator.js`:

   ```javascript
   const { add } = require("../src/calculator");
   ```

8. In your terminal, run `npm test`. You should see 1 out of 1 test cases failed

   PASS test/calculator.test.js
   calculator
   add()
   √ should pass (3 ms)

   Test Suites: 1 passed, 1 total
   Tests: 1 passed, 1 total

### Exercise 1.2: Test more efficient - Property based testing

In this exercise, we are going to try a concept called [Property-based Testing](https://techbeacon.com/app-dev-testing/how-make-your-code-bulletproof-property-testing#:~:text=What%20is%20property%2Dbased%20testing,that%20you%20want%20to%20test.) to test more efficient for the add() function. Before that let's test more on the `add` method.

1.  Add more test cases you can think of for the add().

    ```javascript
    describe("calculator", function() {
      describe("add()", function() {
        // We'll write our test cases here
        test("tc1 - should pass", () => {
          expect(add(1, 1)).toBe(2);
        });

        test("tc2 - should pass", () => {
          expect(add(2, 10)).toBe(12);
        });

        test("tc3 - should pass", () => {
          expect(add(30, 100)).toBe(130);
        });
      });
    });
    ```

    Test Suites: 1 passed, 1 total
    Tests: 3 passed, 3 total

2.  Do you think this is efficient to test many scenario? Probably not. Let try another approach to test this, using Fast-check!

3.  Install [Fast-check](https://github.com/dubzzz/fast-check) and [Jest-Fast-check](https://www.npmjs.com/package/jest-fast-check)

    ```
    npm install --save-dev fast-check jest-fast-check
    ```

4.  Add and remove the codes in `calculator.test.js`

    ```javascript
    const { add } = require("../src/calculator");

    const { testProp, fc } = require("jest-fast-check");

    describe("calculator", function() {
      describe("add()", function() {
        // We'll write our test cases here
        testProp(
          "should ensure random test data",
          [fc.integer(0, 1000), fc.integer(0, 1000)],
          (a, b) => {
            const expectedResult = a + b;
            console.log(a, b);
            expect(add(a, b)).toBe(expectedResult);
          }
        );
      });
    });
    ```

    console.log
    607 19

          at calculator.test.js:10:21

    console.log
    130 865

          at calculator.test.js:10:21

    Test Suites: 1 passed, 1 total
    Tests: 1 passed, 1 total

You can see it will random generating test data and number of test cases. More efficient right?

### Exercise 1.3: Test exceptional scenario as well

In this exercise, we are going to test more on the `add` method. Can you think of what are the exceptional scenario that will happen in add() method?

1. Add more test cases you can think of for the add() and rerun the test

```javascript
describe("calculator", function() {
  describe("add()", function() {
    // We'll write our test cases here
    testProp(
      "should ensure random test data",
      [fc.integer(0, 1000), fc.integer(0, 1000)],
      (a, b) => {
        const expectedResult = a + b;
        console.log(a, b);
        expect(add(a, b)).toBe(expectedResult);
      }
    );

    test("Should failed due to number as string", () => {
      expect(add("1", "2")).toBe(3);
    });
  });
});
```

Expected: 3
Received: "12"

The result from 1+2 = "12"? Why!!!?? Because we are adding two string instead of numbers! Now ask yourself this question. Should the add() validate and reject if the input parameters are string instead of numbers? Depends on the business needs. For this example, let assume we will accept strings as input parameters and convert them to numbers

2. Add the conversion inside `src/calculator.js` and rerun the test cases.

   ```javascript
   const add = (x, y) => {
     const newX = new Number(x);
     const newY = new Number(y);
     return newX + newY;
   };
   ```

All test cases are passed now! Of course there are other exceptional scenario that can happened like what is the x value is null and etc but we are not going to there. Key thing is remind the developer that always think of possible exception scenario. :D

# Chapter 2 : API Testing

In this chapter, we will be learning how to test API.

### Exercise 2.1: Setup Hello API

In this exercise, we are going to install all the dependencies needed to setup the API server first

1. Please ensure in your environment is using Ubuntu or Windows having MongoDB installed.

2. Copy the files from `exercises\chapter2` folders to respective `src` folder.

3. Install the following libraries to setup an API server

   ```
   npm install axios@0.19.0

   npm install body-parser@1.18.3

   npm install express@4.17.1

   npm install mongoose@4.11.7
   ```

4. Start the server by running the following command

   ```
   node src/server
   ```

5. To verify everything is ok, go to localhost:3050/api/health and should see an "OK" message

6. Read through the codes in `src/api/web/ingest` and its dependencies to understand more on what we are will be testing on.

### Exercise 2.2: Mocking function

In this exercise, we will be learning how to mock function and why there is a need for mocking.

Read through the codes in `src/api/web/ingest` and its dependencies if you haven't done so. We will be writing test case for `ingest()` inside `src/api/web/ingest/ingest.js`.

What `ingest()` does is just create new User if the username is not found else will throw a Business Exception indicating the username has already exists.

1. Create `ingest.int.narrow.test.js` inside `test/api/web/ingest`
2. Since we are testing on `ingest()` therefore import the code into `ingest.int.narrow.test.js` and write the following codes

   ```javascript
   const { ingest } = require("../../../../src/api/web/ingest/ingest");

   describe("api/web/ingest/ingest", () => {
     describe("ingest", () => {
       test("should pass when there is no existing username", async () => {
         const result = await ingest({ username: "hello tester" });
         expect(result).toBe("SUCCESS");
       });
     });
   });
   ```

3. Run the test by running the following

   ```
   npm test ingest.int.narrow.test
   ```

4. If you previously able to connect to local MongoDB successfully, you should able to see it should successfully run and one record of User should be created in the Database

5. If you rerun the same test again, you should encounter 1 failed test case. Why? because the user has already exists in the database! To able to keep rerun the same test cases many times, you can solve it either by randomly generated the username each time the test case is run or use mocking to mock the DB methods (in this case is `getUserByUserName()` and `createUser()`) For this exercise We will be mocking both functions

6. Let get started by instructs Jest that we will going to mock the `UserRepository` that contains the `getUserByUserName()` and `createUser()`

   ```javascript
   jest.mock("../../../../src/api/database/UserRepository");
   ```

7. We going to mock the implementation of `getUserByUserName()` by returning an empty array to indicate no records found. Add the codes at the test block before `await ingest` code

   ```javascript
   getUserByUserName.mockImplementation(() => {
     return [];
   });
   ```

8. Next we will mocking the implementation of `createUser()` by returning a "SUCCESS" message

   ```javascript
   createUser.mockImplementation(() => {
     return "SUCCESS";
   });
   ```

9. Finally before each test cases starts, we need to revert`getUserByUserName()` and `createUser()` to original state so hygiene purpose

   ```javascript
   beforeEach(() => {
     getUserByUserName.mockClear();
     createUser.mockClear();
   });
   ```

10. Now we rerun the test case as many times as you want and each time you will get a success test case

### Exercise 2.3: Integration Testing with Jest-testcontainers

In this exercise, we will be learning how to use a library called Jest-testcontainers that can helps you to write a better test while avoiding mocking any behaviors. This exercise requires the machine installed Docker Cli.

#### Why use Testcontainers instead of mocking?

In the previous exercise, we have learnt how to use mocking to mock behaviors but mocking itself should use sparingly as we should always strive to test all the codes as much as possible without changing anything. In this case DB does not actually need to be mock as we can easily setup a DB instance before the test starts and kill the instance once the tests have completed running. Mocking should be use for things that may not easy to setup (like validate JWT token with Oauth server) or calling another REST API.

1. Modify `ingest.int.narrow.test.js` by removing all the mocking related codes and add db so that to disconnect the DB after the test has finished running

   ```javascript
   const { ingest } = require("../../../../src/api/web/ingest/ingest");

   const db = require("../../../../src/api/database/db");

   describe("api/web/ingest/ingest", () => {
     describe("ingest", () => {
       afterAll(async () => {
         await db.disconnect();
       });

       test("should pass when there is no existing username", async () => {
         const result = await ingest({ username: "hello tester" });
         expect(result).toBe("SUCCESS");
       });
     });
   });
   ```

2. Install the [Jest-Testcontainers](https://github.com/Trendyol/jest-testcontainers)

   ```
   npm install -D @trendyol/jest-testcontainers@1.2.0
   ```

3. Add preset inside `jest.config.js`

   ```
   preset: '@trendyol/jest-testcontainers',
   ```

4. Create a new file, `jest-testcontainers-config.js` at the root directory and add the following content

   ```javascript
   module.exports = {
     mongo: {
       image: "mongo",
       tag: "3.4",
       ports: [27017],
     },
   };
   ```

   What this piece of codes meant a mongodb image with tag "3.4" to be created when the testing starting

5. Modify the codes at `src/api/database/db.js`

   ```javascript
   const databaseFromTestDocker = global.__TESTCONTAINERS_MONGO_IP__
     ? `mongodb://${global.__TESTCONTAINERS_MONGO_IP__}:${global.__TESTCONTAINERS_MONGO_PORT_27017__}/iammiddle`
     : null;

   const database =
     process.env.MONGO_CONNECTION ||
     databaseFromTestDocker ||
     "mongodb://localhost:27017/iammiddle";
   ```

   If you look closely at the codes, you will notice that there is MONGO\_\*\_\_\_ which is created by the jest-testcontainers that we need to use to constructs the mongodb connection string.

6. Run the `ingest.int.narrow.test` test multiple times and you should see it will pass

#### Testcontainers vs Docker-Compose

For those familiar with Docker, what Testcontainers does is very similar to Docker Compose. For me I prefer to use Testconainers over Docker Compose because:

- I prefer my docker image to contain only the production codes and Docker Compose when running will build the image and contains the test codes. (although there are ways to prevent this like using Docker multistage)
- Testcontainers will use random port and is useful when there is a scenario that local machine still using the same port that requires.

### Exercise 2.4: Testing API without starting server - SuperTest

In this exercise, we will be looking into how to test API without starting the REST API server using SuperTest

#### Current limitations of existing tests

In the previous exercises, you have tested the business logic of `ingest()` but there are still limitations in the current tests because business logic is called by Controller and if we can test this part, it will be even better!

So let get started!

1. Install the [SuperTest](https://www.npmjs.com/package/supertest)

   ```
   npm install -D supertest@4.0.2
   ```

2. Create a new js file, `ingestApi.int.narrow.test.js` inside `test/api/web/ingest` folder

3. Add the following codes inside `ingestApi.int.narrow.test.js`

   ```javascript
   const request = require("supertest");

   const db = require("../../../../src/api/database/db");

   const ingestApi = require("../../../../src/api/web/ingest/ingestApi");

   const { registerApp } = require("../../../../src/app");
   const app = registerApp({
     connection: {
       readyState: 1,
     },
   });

   describe("GET /api/ingest", () => {
     afterAll(async () => {
       await db.disconnect();
     });

     test("should success", async () => {
       ingestApi.registerIngestApi(app);

       return request(app)
         .post(`/api/ingest`, { username: "fromsupertest" })
         .then((response) => {
           expect(response.statusCode).toBe(200);
           expect(response.body.success).toBe(true);
         });
     });
   });
   ```

   What this piece of test codes does is we want to test '/api/ingest' API and we are using SuperTest to "start" the API by passing the App and test the response of the API like whether the HTTP status code 200 and etc

4. Run `ingestApi.int.narrow.test` test and you should see the test has pass

### Exercise 2.5: API Testing using Postman and Newman

In this exercise, we will be learning another approach to test API by using Postman and Newman

We will not be going through on how to download and install [Postman](https://www.postman.com/) since is quite straightforward.

#### Exercise 2.5.1 Create Collection

#### Exercise 2.5.2 Create folder

#### Exercise 2.5.3 Create environment

#### Exercise 2.5.4 Create request

#### Exercise 2.5.5 Add assertions into request for testing

#### Exercise 2.5.6 Use runner to run all the requests

#### Exercise 2.5.7 Export collection

#### Exercise 2.5.8 Import collection

#### Exercise 2.5.9 Export environment

#### Exercise 2.5.10 Newman

[Newman](https://www.npmjs.com/package/newman) is a command-line collection runner for Postman and I mainly using it to run during CICD Pipelines which will be covered more later.

In order to use Newman to run,

1. Install the [Newman](https://www.npmjs.com/package/newman)

   ```
   npm install -D newman@4.5.4
   ```

2. Export the Collection and Environment and place them into `test/api`

3. Create a new line of `test:apitesting` script in `package.json` like this:

   ```json
   {
     "scripts": {
       "test:apitesting": "node test/apitesting/apitesting"
     }
   }
   ```

4. Create a new js file, `apitesting.js` inside `test/api` folder

5. Add the following codes inside `apitesting.js`

   ```javascript
   const newman = require("newman");

   let environmentStuff = require("./backendapp.postman_environment.json");

   async function start() {
     environmentStuff.values.forEach((element) => {
       if (element.key == "url") {
         element.value = "localhost:3050";
       }
     });

     newman
       .run({
         collection: require("./backend-app.postman_collection.json"),
         reporters: ["cli"],
         folder: ["healthcheck", "search"],
         environment: environmentStuff,
       })
       .on("done", function(err, summary) {
         if (err || summary.error) {
           console.error("collection run encountered an error.");
           process.exit(1);
         } else {
           console.log("collection run completed.");
           process.exit(0);
         }
       });
   }

   start();
   ```

   What this piece of codes does is to import newman module and load environment.json and change the value inside the environment if there is a value set it via process.env.

   What Collection to run is indicated via the name of the collection and any specific folders (in this case, all the requests in healthcheck and search folder will be run only).

   One possible scenario where you need to specify folders is during CICD such as I want to run all test cases at "staging" environment while I want to run all the test cases that not doing any creating data at "production" environment.

6. Open terminal and type the command

   ```
   npm run test:apitesting
   ```

   You should see the newman run successfully and all tests in the Collection should pass

#### Question: SuperTest vs Newman

I am pretty sure after you have tried out both SuperTest and Newman, in your mind may have questions such as:

- when to use SuperTest and Newman?
- Do you need both when both are doing the same tests?

The answers in my opinion are you need both SuperTest and Newman! Taking reference figure 1 from [Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html) when there are two "Test". One is "Test" before deploy and after is "Test" after deploy. SuperTest can be used to test your codes at before deploy test and Newman can be used to test your API is working and serving request after deploy. My personal opinion though. :D

# Chapter 3 : Every small little things to improve your testing

In this chapter, we will be learning some of the techniques and libraries that can help to improve your testing.

### Exercise 3.1: Treat your test codes as production codes

Remember the Chapter 2 exercises where we created `ingest.int.narrow.test.js` and `ingestApi.int.narrow.test`? If you understand fully what both the test codes does, you have realized that both tests are testing the same thing?

`ingest.int.narrow.test.js` is testing the business logic of `ingest()` while `ingestApi.int.narrow.test.js` is testing the API that calls `ingest()`. This means `ingest.int.narrow.test.js` is a duplicate test therefore you do not need this test anymore by just deleting this file! Remember to treat your test codes like your production codes by constant refactoring when necessary.

### Exercise 3.2: Display Test Result in HTML Reporting

Currently each time you run your tests, the test result is displayed in the CLI which may not be that useful if the tests are to be run during CICD and you may either want to publish the results in GitLab/GitHub or download the results for troubleshooting purpose. To achieve that, you can output the test results into a HTML report. For this exercise we will be using another node module, [Jest-html-reporter](https://www.npmjs.com/package/jest-html-reporter)

1. Install the Jest-html-reporter

   ```
   npm install -D jest-html-reporter@2.8.0
   ```

2. Add the following codes in `jest.config.js`

   ```javascript
   "reporters": [
       "default",
       ["./node_modules/jest-html-reporter", {
           "outputPath": "./reports/test-report.html",
           "pageTitle": "Test Report"
       }]
   ]
   ```

3. Open terminal and type the command

   ```
   npm test
   ```

   You should see the tests should run as well as the jest-html-reporter >> Report generated (./reports/test-report.html)

### Exercise 3.3: ESlint + Prettier

I love green build in CICD pipelines and should always strive to do so. Committing codes such as using Await without Async or declare same const variables without testing is inexcusable.

Also sometimes newly joined developer does not know how the team structure their codes like whether to use Single Quote or Double Quote when declaring String value (I admit, I been asking myself this question many times before I find out the answer myself)

Luckily there are tools out there can help us do some form of checking or do the formatting for us. In other words, Automated Code Review.

[EsLint](https://eslint.org/) is a tool that scan your codes and flagged out any potential problems.

[Prettier](https://prettier.io/) is a tool that can help you to format your codes.

By using these two, I could potentially reduce committing my codes that caused any run-time errors as well as everyone in the team will be using the same configuration or thinking on how to format the codes.

1. Install all the node libraries for EsLint and Prettier

   ```
   npm i -D eslint@6.6.0 eslint-config-prettier@6.9.0 eslint-plugin-node@11.0.0 eslint-plugin-prettier@3.1.1 eslint-plugin-promise@4.2.1 eslint-plugin-security@1.4.0 prettier@1.19.1
   ```

2. Create `.prettierrc` at your root directory

3. Add the following codes in `.prettierrc`

   ```json
   {
     "tabWidth": 4,
     "printWidth": 150,
     "singleQuote": true
   }
   ```

   Please refer to [here](hhttps://prettier.io/docs/en/options.html) for more information on what does each key-value meant.

4. Create `.eslintrc.json` at your root directory

5. Add the following codes in `.eslintrc.json`

   ```json
   {
     "env": {
       "browser": true,
       "es6": true,
       "jest": true,
       "jasmine": true,
       "node": true
     },
     "extends": [
       "prettier",
       "eslint:recommended",
       "plugin:node/recommended",
       "plugin:security/recommended",
       "plugin:promise/recommended"
     ],
     "overrides": [
       {
         "files": ["test/**/*.js"],
         "rules": {
           "node/no-unpublished-require": "off",
           "promise/always-return": "off",
           "no-process-exit": "warn"
         }
       }
     ],
     "parserOptions": {
       // Only ESLint 6.2.0 and later support ES2020.
       "ecmaVersion": 2018,
       "sourceType": "module"
     },
     "plugins": ["prettier"],
     "rules": {
       "prettier/prettier": ["error"],
       "promise/always-return": "warn"
     }
   }
   ```

   Please refer to [here](https://eslint.org/docs/user-guide/configuring) for more information on how to setup such as overriding the rules.

   One thing to note, if you look at "overrides", you will see that I am changing some of the rules for test codes. What it meant is that some of the rules are not applicable to the test codes such as using library that are under DevDependencies.

6. Create `.eslintignore` at your root directory

7. Add the following codes in `.eslintignore`

   ```
   .gitignore
   reports/
   **/node_modules/**
   package-lock.json
   package.json
   ```

   This file help me to indicate which files or folders that should be excluded from EsLint.

8. Create few lines of script in `package.json` like this:

   ```json
   {
     "scripts": {
       "linting": "node_modules/.bin/eslint . --ext .js && echo 'Lint Complete'",
       "linting:log": "node_modules/.bin/eslint . --ext .js -f compact -o lint.log",
       "linting:fix": "node_modules/.bin/eslint . --ext .js --fix"
     }
   }
   ```

9. To lint your codes, Open terminal and type the command

   ```
   npm run linting
   ```

10. You should able to see the linting result and should be many formatting errors which mostly can be easily solved. To ask EsLint to fix as much problem as possible, type the command

    ```
    npm run linting:fix
    ```

    You should see most or all errors have already resolved!

### Exercise 3.4: Code Coverage - To see if your tests are testing your codes

One technique to see if your tests are really testing your production codes are using **Code Coverage**. Code coverage is a measurement of how many lines/blocks/arcs of your **production codes** are executed while the tests are running.

1. Add the following codes in `jest.config.js`

   ```json
   coverageDirectory: "./reports/coverage",
   collectCoverage: true,
   coverageReporters: ["text", "html"],
   collectCoverageFrom: [
       "./src/**/*.js"
   ],
   ```

2. Open terminal and type the command

   ```
   npm test
   ```

   You should see the tests should run as well as see code coverage.

   | File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
   | ---------------- | ------- | -------- | ------- | ------- | ----------------- |
   | All files        | 45.11   | 22.86    | 30.43   | 45.11   |                   |
   | src              | 100     | 100      | 100     | 100     |                   |
   | app.js           | 100     | 100      | 100     | 100     |                   |
   | calculator.js    | 100     | 100      | 100     | 100     |                   |
   | src/api/database | 45      | 100      | 0       | 45      |                   |
   | User.model.js    | 100     | 100      | 100     | 100     |                   |

   You can view the HTML report by opening the index.html found at ./reports/coverage

### Exercise 3.5: Eslint with Jest to ensure your tests are asserting test result

In previous exercise where we learn how to use Code Coverage to measure how much **production code **are executed and this also meant what production codes are being run by the tests, your tests may not doing any assertion on the expected result due to developers' carelessness.

To demonstrate this:

1. Copy `exercises/chapter3/temperature.js` to `src` folder

2. Copy `exercises/chapter3/temperature.unit.test.js` to `test` folder

3. Look at `test/temperature.unit.test.js` and you noticed that the tests are not asserting anything

4. Open terminal and type the command

   ```
   npm test temperature.unit.test
   ```

   You should see the temperature's test has run as well as 100% code coverage where the test are not asserting anything! Using Code Coverage to see if your tests are effective is not silver bullet (we come to that later on what maybe a better approach).

   One way to ensure all your tests are asserting something minimally is by using eslint-plugin-jest.

5. Install [eslint-plugin-jest](https://www.npmjs.com/package/eslint-plugin-jest)

   ```
   npm i -D eslint-plugin-jest@23.0.4
   ```

6. Add the following codes in `.eslintrc.json`

   ```json
   "extends": [
       "plugin:jest/recommended"
   ],
    "rules": {
       "jest/expect-expect": "error"
   }
   ```

   What this lines of codes does are to tell Eslint i got new plugin to add and I overriding jest/expect-expect rule to display errors if the test does not have any assertion.

7. To lint your codes, Open terminal and type the command

   ```
   npm run linting
   ```

   You will see that the linting will flag out temperate.unit.test.js which does not have any assertion.

   testing-nodejs-backend\test\temperature.unit.test.js
   4:3 error Test has no assertions jest/expect-expect

8. To solve this problem, go to `test/temperature.unit.test.js` and ensure it is asserting

   ```javascript
   const { isWeatherHot } = require("../src/temperature");

   describe("temperature", () => {
     test("Should return true", () => {
       expect(isWeatherHot(100)).toBeTruthy();
     });

     test("Should return false", () => {
       expect(isWeatherHot(20)).toBeFalsy();
     });
   });
   ```

   Rerun the linting and verify the previous error is no longer flagged out.

### Exercise 3.6: Tag your tests

Occasionally, we may only want to run certain type of test cases. For example, in a HR system where there are many modules such as Leave module, Claim module, Salary module. Let say if someone makes a code change in the Leave module, do we want to run all the test cases in the HR system? Definitely yes if we have the time to do so but if we do not have the time, the best approach will be "I need to run all the Leave module related test cases". By tagging your tests, you certainly can do so.

1. Install [jest-runner-groups](https://www.npmjs.com/package/jest-runner-groups)

   ```
   npm i -D jest-runner-groups@2.0.1
   ```

2. Add the following line at `jest.config.js`

   ```javascript
   runner: "groups";
   ```

3. For demonstration, we will be adding sample @group at `test/temperature.unit.test.js`

   ```javascript
   const { isWeatherHot } = require("../src/temperature");

   /**
    *
    * @group fast
    * @group unit
    */
   describe("temperature", () => {
     test("Should return true", () => {
       expect(isWeatherHot(100)).toBeTruthy();
     });

     test("Should return false", () => {
       expect(isWeatherHot(20)).toBeFalsy();
     });
   });
   ```

4. Create one line of script in `package.json` like this:

   ```json
   {
     "scripts": {
       "test:unit": "jest --group=unit"
     }
   }
   ```

5. Run the following command

```
npm run test:unit
```

You should see only `temperature.unit.test.js` has run

### Exercise 3.7: Mutation Testing - Advanced technique to check your tests' effectiveness

#### Why 100% Code Coverage is not a good indicator

In the previous exercise when we have go through about what is **Code Coverage** and how it helps us to see if all our **production codes** are executed by the tests and deemed as fully tested. While some of us might strive for 100% code coverage, it is not a good indicator whether your tests are effective. Let's use some simple example, `temperature.js` and `temperature.unit.test.js` for illustration (please do not mind how the if-else code is written. :P)

`temperature.js`

```javascript
const isWeatherHot = (temperature) => {
  if (temperature >= 30) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  isWeatherHot,
};
```

`temperature.unit.test.js`

```javascript
const { isWeatherHot } = require("../src/temperature");

/**
 *
 * @group fast
 * @group unit
 */
describe("temperature", () => {
  test("Should return true", () => {
    expect(isWeatherHot(100)).toBeTruthy();
  });

  test("Should return false", () => {
    expect(isWeatherHot(20)).toBeFalsy();
  });
});
```

![Coverage Report](./imgs/mutation1.png)

As you can see, the tests achieved 100% code coverage but the tests did not cover at least one scenario (See if you can spot it before announce the answer at the bottom). Mutation Testing can help to identify this scenario.

#### Why Mutation Testing

From Wikipedia:
**Mutation testing** (or mutation analysis or program mutation) is used to design new software tests and evaluate the quality of existing software tests.

Mutation testing involves modifying a program in small ways. Each mutated version is called a mutant and tests detect and reject mutants by causing the behavior of the original version to differ from the mutant. This is called killing the mutant. Test suites are measured by the percentage of mutants that they kill. New tests can be designed to kill additional mutants. Mutants are based on well-defined mutation operators that either mimic typical programming errors (such as using the wrong operator or variable name) or force the creation of valuable tests (such as dividing each expression by zero).

The purpose is to help the tester/developer develop effective tests or locate weaknesses in the test data used for the program or in sections of the code that are seldom or never accessed during execution. Mutation testing is a form of [white-box testing](https://en.wikipedia.org/wiki/White-box_testing).

![Sample Mutation Code](./imgs/mutation1.1.png)

Let try using [Strkyer](https://stryker-mutator.io/) to try Mutation Testing.

1. Install Strkyer and other node modules

   ```
   npm i -D @stryker-mutator/core@2.4.0 @stryker-mutator/html-reporter@2.4.0 @stryker-mutator/javascript-mutator@2.4.0 @stryker-mutator/jest-runner@2.4.0 mutation-testing-report-schema@1.3.1
   ```

2. Create `stryker.ci.conf.js` with the following contents:

   ```javascript
   module.exports = function(config) {
     config.set({
       mutate: ["src/**/*.js", "!src/server.js"],
       mutator: {
         name: "javascript",
         excludedExpressions: ["console.log"],
       },
       reporters: ["html", "clear-text", "progress"],
       testRunner: "jest",
       transpilers: [],
       coverageAnalysis: "off",
       timeoutMs: 60000,
       jest: {
         projectType: "custom",
         config: require("./jest.config.js"),
         enableFindRelatedTests: true,
       },
     });
   };
   ```

3. Create one line of script in `package.json` like this:

   ```json
   {
     "scripts": {
       "test:mutation": "stryker run stryker.ci.conf.js"
     }
   }
   ```

4. You should commit all your codes first as Stryker will mutate your actual codes and in case it does not rollback after the test.

5. Run the following command

   ```
   npm run mutation:ci
   ```

   You can view the report at /reports/mutation/index.html

   ![Report 1](./imgs/mutation2.png)

6. When you click on the red color, you will see something as shown:

![Report 2](./imgs/mutation3.png)

This shows that one of the mutants survived when the code changed to " > 30" because the tests did not test for it!

7. Go back to `temperature.unit.test.js` and add one more test case

   ```javascript
   test("Should return true for 30", () => {
     expect(isWeatherHot(30)).toBeTruthy();
   });
   ```

8. Rerun the mutation test and should see the mutant has been killed. ![Report 3](./imgs/mutation4.png)

# Chapter 4 : Improve your productivity and coding

In this chapter, we will be learning what tools and libraries out there that can improve our productivity and coding/testing

### Exercise 4.1: Useful Vscode Extensions

The following VSCode Extensions is highly recommended to use for node backend:

- ESLint
- Jest
- Prettier
- Bracket Pair Colorizer
- Docker
- JavaScript (ES6) Code Snippets
- Bookmarks

### Exercise 4.2: Auto-format your code upon saving

In previous chapter where we have setup Prettier to format our codes whenever we run ESLint but this approach is still too manual. There is a way to format the current open source code upon saving in VSCode.

1. Installed ESLint and Prettier VSCode Extension
2. At VSCode, go to File -> Preferences -> Settings
3. Enter "codeactionsonsave" in the search bar and click "Edit in settings.json"
4. Change the value in editor.codeActionsOnSave to as followed

   ```json
   "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
   ```

5. Now go to any of the .js code and enter some code. Once you save, it should format the code

### Exercise 4.3: Automated Pre-commit Run Check using Husky and Lint-staged

In the previous exercise where we learn how to use VSCode to auto format upon saving. This approach while it saves manual effort on formatting the code, the challenge that developers (especially me) often faces is how to remember to run automated testing and linting before commit the codes so that to prevent bad built as much as possible? Fear not, thanks to google, I finally got the answer, Husky and Lint-staged

1. Install [Husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged)

   ```
   npm i -D lint-staged@10.1.3 husky@4.2.1
   ```

2. Add the following codes in `package.json` like this:

   ```json
   "lint-staged": {
       "*.{js,jsx}": [
           "node_modules/.bin/eslint . --ext .js --fix",
           "jest --bail --findRelatedTests",
           "git add"
       ]
   },
   "husky": {
       "hooks": {
           "pre-commit": "lint-staged"
       }
   }
   ```

Husky will be triggered when you try to git commit (pre-commit hook) and will find "lint-staged" to execute commands that you specified. In the example, it will run an es-lint check and jest test.

To demonstrate, you can try to make a test that failed on purpose or ESLint contains errors and try to commit. You will encounter a message saying "Husky > pre-commit hook failed (add --no-verify to bypass)

### Exercise 4.4: Use Code Snippet to reduce duplicate typing of codes

Is there any line of codes that you have repeatedly typing out? For me definitely yes, for example, console.log(), Jest-describe-test. Why not just use "code snippet" that auto creates those line of codes for us? Yes please!

For this example, I will be showing how to create Code Snippet to auto create few lines of Jest-describe-test whenever I type out prefix.

1. At VSCode, go to File -> Preferences -> User Snippets

2. Click on New Global Snippets file...

3. Enter the name for the file. You should see it will create a new file as shown: ![sample](./imgs/codesnippet1.png)

4. You need to use the format as shown in the file. Alternative you can use [Snippet Generator](https://snippet-generator.app/) to create the format for you.

For this example, I have provide the template which I am currently using now. Copy and paste the following template and save it.

    ```json
    {
        "Jest Desc and Test": {
            "prefix": "desctest",
            "body": [
                "const {} = require('${TM_FILEPATH}/${TM_FILENAME_BASE}')",
                "",
                "describe('${TM_FILENAME_BASE}', () => {",
                "    describe('Name of the group', () => {",
                "        test('should ', () => {",
                "            ",
                "        });",
                "    });",
                "});"
            ],
            "description": "Jest Desc and Test"
        }
    }
    ```

5. To test, go to any of the .js file and type out desctest.

![sample](./imgs/codesnippet2.gif)

### Exercise 4.5: Check your dependencies with dependency-cruiser

In a typical project where there are rules and regulations on how to places those files. For my example, I have `src` and `test` folders and let me ask you a question, should any of the codes in `src` folder referenced any codes in `test` folder? Probably not because `src` folder are meant for production codes and `test` folder are meant for testing codes and will not be copied when building Docker image and what if the codes in `src` folder referenced the codes in `test` folder? highly when the Docker image deployed to production will encountered run time error....

To prevent such things from happening, you can use Dependency-Cruiser to check for dependency that includes incorrect file dependency!

1. Install [dependency-cruiser](https://github.com/sverweij/dependency-cruiser)

   ```
   npm i -D dependency-cruiser@8.1.1
   ```

2. Add the following codes in `package.json` like this:

   ```json
   "scripts": {
       "dependency-cruiser:validate": "./node_modules/.bin/depcruise --validate .dependency-cruiser.json src",
   }
   ```

3. Create a new file, `.dependency-cruiser.json` and copy the following content into the file

   ```json
   {
     "forbidden": [
       {
         "name": "not-to-test",
         "comment": "don't allow dependencies from outside the test folder to test",
         "severity": "error",
         "from": { "pathNot": "^test" },
         "to": { "path": "^test" }
       },
       {
         "name": "not-from-database",
         "comment": "don't allow dependencies from database to anywhere else except common",
         "severity": "error",
         "from": { "path": "^src/api/database" },
         "to": {
           "pathNot": "^src/api/database|src/common|node_modules"
         }
       }
     ]
   }
   ```

   The two forbidden rules meant:

   - Do not allow any dependencies from non-test folder to test folder
   - Do not allow any dependencies from DB folder to any folder EXCEPT common folder

4. You can purposely break these rules and run the following command:

   ```
   npm run dependency-cruiser:validate
   ```

### Exercise 4.6: Duplicate code check using JSCPD

In a large project where there are many developers working on the same project with many files and codes in it. Unknowingly we may unintended create duplicate codes that exists in the code base. To check for duplicate codes, use jscpd

1. Install [jscpd](https://github.com/kucherenko/jscpd)

   ```
   npm i -D jscpd
   ```

2. Add the following codes in `package.json` like this:

   ```json
   "scripts": {
       "scan:codeduplicate": "jscpd src test --reporters html --output reports/codeduplicate"
   }
   ```

3. Run the following command:

   ```
   npm run scan:codeduplicate
   ```

   You can find the report at /reports/codeduplicate

   ![sample duplicate report](./imgs/codeduplicate1.png)

### Exercise 4.7: View Code Complexity

As a developer, we need to understand whether that function I wrote is it complexity or maintainable or not. [Code Complexity](https://blog.codacy.com/an-in-depth-explanation-of-code-complexity/) is a software metric used to indicate the complexity of a program.

1. Install [es6-plato](https://github.com/the-simian/es6-plato)

   ```
   npm i -D es6-plato@1.2.3
   ```

2. Add the following codes in `package.json` like this:

   ```json
   "scripts": {
       "plato:es6": "./node_modules/.bin/es6-plato -r -d reports/esplato src",
   }
   ```

3. Run the following command:

   ```
   npm run plato:es6
   ```

   You can find the report at /reports/esplato

# Disclaimer

I do not claim what I teaching or sharing is correct since I am also learning as well but I always believe that we need to keep learning and pause our work is needed in order to improve ourselves in order to go even faster and further.

![keep improving](./imgs/keepimprove.jpg)
