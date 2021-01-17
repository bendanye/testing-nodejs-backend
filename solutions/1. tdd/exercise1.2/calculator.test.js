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