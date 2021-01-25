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