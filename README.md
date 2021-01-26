# Testing-nodejs-backend
__Table of Contents__

[Introduction](#introduction)

[Setup](#setup)

[Chapter 1 - TDD](#chapter-1--tdd)

- [Exercise 1.1: Hello Calculator](#-exercise-11-hello-calculator)
- [Exercise 1.2: Test more efficient - Property based testing](#-exercise-12-test-more-efficient)
- [Exercise 1.3: Test exceptional scenario as well](#-exercise-13-test-exceptional-scenario-as-well)

[Chapter 2 - API Testing](#chapter-2--api-testing)

- [Exercise 2.1: Setup Hello API](#-exercise-21-hello-api)
- [Exercise 2.2: Mock that DB](#-exercise-22-mock-that-DB)
- [Exercise 2.3: Integration Testing with Jest-testcontainers](#-exercise-23-integration-testing-with-jest-testcontainers)
- [Exercise 2.4: Test API without starting server - Supertest](#-exercise-24-test-api-without-starting-server)
- [Exercise 2.5: Test API using Postman and Newman](#-exercise-25-test-api-without-starting-server)

[Chapter 3 - Every small little things to improve your testing](#chapter-3--every-small-little-things-to-improve-your-testing)

- [Exercise 3.1: Treat your test codes as production codes](#-exercise-31-treat-your)
- [Exercise 3.2: Display Test Result in HTML Reporting](#-exercise-32-display-test-result)
- [Exercise 3.3: ESlint + Prettier](#-exercise-33-eslint-prettier)
- [Exercise 3.4: Code Coverage - To see if your tests are testing your codes](#-exercise-34-code-coverage)
- [Exercise 3.5: Eslint with Jest to ensure your tests are verify test result](#-exercise-35-eslint-jest)
- [Exercise 3.6: Tag your tests](#-exercise-36-tag-tests)
- [Exercise 3.7: Mutation Testing - Advanced technique to check your tests' effectiveness](#-exercise-37-mutation-testing)

[Chapter 4 - Improve your productivity and coding](#chapter-4--improve-your-productivity-and-coding)

- [Exercise 4.1: Useful Vscode Extensions](#-exercise-41-useful-vscode-extensions)
- [Exercise 4.2: Auto-format your code upon saving](#-exercise-42-auto-format-codes)
- [Exercise 4.3: Auto-linting using Husky and Lint-stage](#-exercise-43-husky-lintstage)
- [Exercise 4.4: Use code Snippet to reduce duplicate typing of codes](#-exercise-44-code-snippet)
- [Exercise 4.5: Check your dependencies with dependency-cruiser](#-exercise-45-dependencies-cruister)
- [Exercise 4.6: Duplicate code check using JSCPD](#-exercise-46-jscpd)

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
        "test": "jest"
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

#  Chapter 2 : API Testing

In this chapter, we will be learning how to test API.

###  Exercise 2.1: Setup Hello API

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

###  Exercise 2.2: Mocking function

In this exercise, we will be learning how to mock function and why there is a need for mocking.

Read through the codes in `src/api/web/ingest` and its dependencies if you haven't done so. We will be writing test case for `ingest()` inside `src/api/web/ingest/ingest.js`. 

What `ingest()` does is just create new User if the username is not found else will throw a Business Exception indicating the username has already exists. 

1. Create `ingest.int.narrow.test.js` inside `test/api/web/ingest`
2. Since we are testing on `ingest()` therefore import the code into `ingest.int.narrow.test.js` and write the following codes

```javascript
const { ingest } = require('../../../../src/api/web/ingest/ingest');

describe('api/web/ingest/ingest', () => {
    describe('ingest', () => {
        test('should pass when there is no existing username', async() => {
            const result = await ingest({ username: "hello tester" });
            expect(result).toBe("SUCCESS")
        });
    });
});
```

3. Run the test by running the following

   ```
   npm test ingest.int.narrow.test
   ```

4. If you previously able to connect to local MongoDB successfully, you should able to see it should successfully run and one record of User should be created in the Database

5. If you rerun the same test again, you should encounter 1 failed test case. Why? because the user has already exists in the database! To able to keep rerun the same test cases many times, you can solve it either by randomly generated the username each time the test case is run or use mocking to mock the DB methods (in this case is `getUserByUserName()` and `createUser()`)  For this exercise We will be mocking both functions

6. Let get started by instructs Jest that we will going to mock the `UserRepository` that contains the `getUserByUserName()` and `createUser()`

```javascript
jest.mock('../../../../src/api/database/UserRepository');
```

7. We going to mock the implementation of `getUserByUserName()` by returning an empty array to indicate no records found. Add the codes at the test block before `await ingest` code

```javascript
getUserByUserName.mockImplementation(() => {
    return []
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

###  Exercise 2.3: Integration Testing with Jest-testcontainers

In this exercise, we will be learning how to use a library called Jest-testcontainers that can helps you to write a better test while avoiding mocking any behaviors. This exercise requires the machine installed Docker Cli. 

####  Why use Testcontainers instead of mocking?

In the previous exercise, we have learnt how to use mocking to mock behaviors but mocking itself should use sparingly as we should always strive to test all the codes as much as possible without changing anything. In this case DB does not actually need to be mock as we can easily setup a DB instance before the test starts and kill the instance once the tests have completed running. Mocking should be use for things that may not easy to setup (like validate JWT token with Oauth server) or calling another REST API.

1. Modify `ingest.int.narrow.test.js` by removing all the mocking related codes and add db so that to disconnect the DB after the test has finished running

```javascript
const { ingest } = require('../../../../src/api/web/ingest/ingest');

const db = require('../../../../src/api/database/db');

describe('api/web/ingest/ingest', () => {
    describe('ingest', () => {

        afterAll(async () => {
            await db.disconnect();
        });

        test('should pass when there is no existing username', async() => {
            const result = await ingest({ username: "hello tester" });
            expect(result).toBe("SUCCESS")
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
           image: 'mongo',
           tag: '3.4',
           ports: [27017]
       }
   };
   ```

   What this piece of codes meant a mongodb image with tag "3.4" to be created when the testing starting 

5. Modify the codes at `src/api/database/db.js`

   ```javascript
   const databaseFromTestDocker = global.__TESTCONTAINERS_MONGO_IP__
       ? `mongodb://${global.__TESTCONTAINERS_MONGO_IP__}:${global.__TESTCONTAINERS_MONGO_PORT_27017__}/iammiddle`
       : null;
   
   const database = process.env.MONGO_CONNECTION || databaseFromTestDocker || 'mongodb://localhost:27017/iammiddle';
   ```

   If you look closely at the codes, you will notice that there is MONGO_*___ which is created by the jest-testcontainers that we need to use to constructs the mongodb connection string.

6. Run the `ingest.int.narrow.test` test multiple times and you should see it will pass

####  Testcontainers vs Docker-Compose

For those familiar with Docker, what Testcontainers does is very similar to Docker Compose. For me I prefer to use Testconainers over Docker Compose because:

- I prefer my docker image to contain only the production codes and Docker Compose when running will build the image and contains the test codes. (although there are ways to prevent this like using Docker multistage)
- Testcontainers will use random port and is useful when there is a scenario that local machine still using the same port that requires.

###  Exercise 2.4: Testing API without starting server - SuperTest

In this exercise, we will be looking into how to test API without starting the REST API server using SuperTest

####  Current limitations of existing tests

In the previous exercises, you have tested the business logic of `ingest()`  but there are still limitations in the current tests because business logic is called by Controller and if we can test this part, it will be even better! 

So let get started!

1. Install the [SuperTest](https://www.npmjs.com/package/supertest)

   ```
   npm install -D supertest@4.0.2
   ```

2. Create a new js file, `ingestApi.int.narrow.test.js` inside `test/api/web/ingest` folder

3. Add the following codes inside `ingestApi.int.narrow.test.js`

   ```javascript
   const request = require('supertest');
   
   const db = require('../../../../src/api/database/db');
   
   const ingestApi = require('../../../../src/api/web/ingest/ingestApi');
   
   const { registerApp } = require('../../../../src/app');
   const app = registerApp({
       connection: {
           readyState: 1
       }
   });
   
   describe('GET /api/ingest', () => {
   
       afterAll(async () => {
           await db.disconnect();
       });
   
       test('should success', async () => {
           ingestApi.registerIngestApi(app);
   
           return request(app)
               .post(`/api/ingest`, { username: 'fromsupertest' })
               .then(response => {
                   expect(response.statusCode).toBe(200);
                   expect(response.body.success).toBe(true);
               });
       });
   });
   ```

   What this piece of test codes does is we want to test '/api/ingest' API and we are using SuperTest to "start" the API by passing the App and test the response of the API like whether the HTTP status code 200 and etc

4. Run `ingestApi.int.narrow.test` test and you should see the test has pass

###  Exercise 2.5: API Testing using Postman and Newman

In this exercise, we will be learning another approach to test API by using Postman and Newman

We will not be going through on how to download and install [Postman](https://www.postman.com/) since is quite straightforward.

####  Exercise 2.5.1 Create Collection

####  Exercise 2.5.2 Create folder

####  Exercise 2.5.3 Create environment

####  Exercise 2.5.4 Create request

####  Exercise 2.5.5 Add assertions into request for testing

####  Exercise 2.5.6 Use runner to run all the requests

####  Exercise 2.5.7 Export collection

####  Exercise 2.5.8 Import collection

####  Exercise 2.5.9 Export environment

####  Exercise 2.5.10 Newman

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
   const newman = require('newman');
   
   let environmentStuff = require('./backendapp.postman_environment.json');
   
   async function start() {
   
       environmentStuff.values.forEach(element => {
           if (element.key == 'url') {
               element.value = 'localhost:3050';
           }
       });
   
       newman
           .run({
               collection: require('./backend-app.postman_collection.json'),
               reporters: ['cli'],
               folder: ['healthcheck', 'search'],
               environment: environmentStuff
           })
           .on('done', function(err, summary) {
               if (err || summary.error) {
                   console.error('collection run encountered an error.');
                   process.exit(1);
               } else {
                   console.log('collection run completed.');
                   process.exit(0);
               }
           });
   }
   
   start();
   ```

   What this piece of codes does is to import newman module and load environment.json and change the value inside the environment if there is a value set it via process.env. 

   What Collection to run is indicated via the name of the collection and any specific folders (in this case, all the requests in healthcheck and search folder will be run only) 

6. Open terminal and type the command

    ```
   npm run test:apitesting
   ```

   You should see the newman run successfully and all tests in the Collection should pass

####  Question: SuperTest vs Newman

I am pretty sure after you have tried out both SuperTest and Newman, in your mind may have questions such as:

- when to use SuperTest and Newman?
- Do you need both when both are doing the same tests?

The answers in my opinion are you need both SuperTest and Newman! Taking reference figure 1 from [Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html) when there are two "Test". One is "Test" before deploy and after is "Test" after deploy. SuperTest can be used to test your codes at before deploy test and Newman can be used to test your API is working and serving request after deploy. My personal opinion though. :D


#  Chapter 3 : Every small little things to improve your testing

In this chapter, we will be learning some of the techniques and libraries that can help to improve your testing.

###  Exercise 3.1: Treat your test codes as production codes

Remember the Chapter 2 exercises where we created `ingest.int.narrow.test.js` and `ingestApi.int.narrow.test`? If you understand fully what both the test codes does, you have realized that both tests are testing the same thing?

`ingest.int.narrow.test.js` is testing the business logic of `ingest()` while `ingestApi.int.narrow.test.js` is testing the API that calls `ingest()`.  This means `ingest.int.narrow.test.js` is a duplicate test therefore you do not need this test anymore by just deleting this file! Remember to treat your test codes like your production codes by constant refactoring when necessary.

###  Exercise 3.2: Display Test Result in HTML Reporting

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

###  Exercise 3.3: ESlint + Prettier

I love green build in CICD pipelines and should always strive to do so. Committing codes such as using Await without Async or declare same const variables without testing is inexcusable. 

Also sometimes newly joined developer does not know how the team structure their codes like whether to use Single Quote or Double Quote when declaring String value (I admit, I been asking myself this question many times before I find out the answer myself) 

Luckily there are tools out there can help us do some form of checking or do the formatting for us.

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
        "plugins": [
            "prettier"
        ],
        "rules": {
            "prettier/prettier": ["error"],
            "promise/always-return": "warn"
        }
    }
    ```

    Please refer to [here](https://eslint.org/docs/user-guide/configuring) for more information on how to setup such as overriding the rules.

    One thing to note, if you look at "overrides", you will see that I am changing some of the rules for test codes. What it meant is that some of the rules are not applicable to the test codes such as using library that are under DevDependencies.

5. Create `.eslintignore` at your root directory

6. Add the following codes in `.eslintignore`

    ```
    .gitignore
    reports/
    **/node_modules/**
    package-lock.json
    package.json
    ```

    This file help me to indicate which files or folders that should be excluded from EsLint.

7. Create few lines of script in `package.json` like this:

    ```json
    {
        "scripts": {
            "linting": "node_modules/.bin/eslint . --ext .js && echo 'Lint Complete'",
            "linting:log": "node_modules/.bin/eslint . --ext .js -f compact -o lint.log",
            "linting:fix": "node_modules/.bin/eslint . --ext .js --fix",
        }
    }
    ```

8. To lint your codes, Open terminal and type the command

    ```
   npm run linting
   ```

9. You should able to see the linting result and should be many formatting errors which mostly can be easily solved. To ask EsLint to fix as much problem as possible, type the command

    ```
   npm run linting:fix
   ```

   You should see most or all errors have already resolved!

###  Exercise 3.4: Code Coverage - To see if your tests are testing your codes

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

   File                |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
   --------------------|----------|----------|----------|----------|-------------------|
   All files           |    45.11 |    22.86 |    30.43 |    45.11 |                   |
    src                |      100 |      100 |      100 |      100 |                   |
     app.js            |      100 |      100 |      100 |      100 |                   |
     calculator.js     |      100 |      100 |      100 |      100 |                   |
    src/api/database   |       45 |      100 |        0 |       45 |                   |
     User.model.js     |      100 |      100 |      100 |      100 |                   |

    You can view the HTML report by opening the index.html found at ./reports/coverage

###  Exercise 3.5: Eslint with Jest to ensure your tests are verify test result

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
      4:3  error  Test has no assertions                                     jest/expect-expect

8. To solve this problem, go to `test/temperature.unit.test.js` and ensure it is asserting

    ```javascript
    const { isWeatherHot } = require('../src/temperature');

    describe('temperature', () => {
        test('Should return true', () => {
            expect(isWeatherHot(100)).toBeTruthy();
        });

        test('Should return false', () => {
            expect(isWeatherHot(20)).toBeFalsy();
        });
    });
    ```
    Rerun the linting and verify the previous error is no longer flagged out.

###  Exercise 3.6: Tag your tests

Occasionally, we may only want to run certain type of test cases. For example, in a HR system where there are many modules such as Leave module, Claim module, Salary module. Let say if someone makes a code change in the Leave module, do we want to run all the test cases in the HR system? Definitely yes if we have the time to do so but if we do not have the time, the best approach will be "I need to run all the Leave module related test cases". By tagging your tests, you certainly can do so.

1. Install [jest-runner-groups](https://www.npmjs.com/package/jest-runner-groups)

   ```
   npm i -D jest-runner-groups@2.0.1
   ```

2. Add the following line at `jest.config.js`

   ```javascript
   runner: "groups"
   ```

3. For demonstration, we will be adding sample @group at `test/temperature.unit.test.js`

   ```javascript
   const { isWeatherHot } = require('../src/temperature');

    /**
    *
    * @group fast
    * @group unit
    */
    describe('temperature', () => {
        test('Should return true', () => {
            expect(isWeatherHot(100)).toBeTruthy();
        });

        test('Should return false', () => {
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
   
###  Exercise 3.7: Mutation Testing - Advanced technique to check your tests' effectiveness

In this chapter, we will be learning how to test API.

#  Chapter 4 : Improve your productivity and coding

In this chapter, we will be learning how to test API.

###  Exercise 4.1: Useful Vscode Extensions

In this chapter, we will be learning how to test API.

###  Exercise 4.2: Auto-format your code upon saving

In this chapter, we will be learning how to test API.

###  Exercise 4.3: Auto-linting using Husky and Lint-stage

In this chapter, we will be learning how to test API.

###  Exercise 4.4: Use code Snippet to reduce duplicate typing of codes

In this chapter, we will be learning how to test API.

###  Exercise 4.5: Check your dependencies with dependency-cruiser

In this chapter, we will be learning how to test API.

###  Exercise 4.6: Duplicate code check using JSCPD

In this chapter, we will be learning how to test API.

```

```