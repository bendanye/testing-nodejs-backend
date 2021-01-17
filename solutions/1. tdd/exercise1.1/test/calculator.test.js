const {add} = require('../src/calculator')

describe("calculator", function() {
    describe("add()", function() {
        // We'll write our test cases here
        test('should pass', () => {
            expect(add(1,1)).toBe(2);
        });
        
    })
})