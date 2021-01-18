const { ingest } = require('../../../../src/api/web/ingest/ingest');

jest.mock('../../../../src/api/database/UserRepository');

const { getUserByUserName, createUser } = require('../../../../src/api/database/UserRepository')

describe('api/web/ingest/ingest', () => {
    describe('ingest', () => {
        beforeEach(() => {
            getUserByUserName.mockClear();
            createUser.mockClear();
        });

        test('should pass when there is no existing username', async() => {
            getUserByUserName.mockImplementation(() => {
                return []
            });

            createUser.mockImplementation(() => {
                return "SUCCESS";
            });

            const result = await ingest({ username: "hello tester" });
            expect(result).toBe("SUCCESS")
        });

        
    });
});