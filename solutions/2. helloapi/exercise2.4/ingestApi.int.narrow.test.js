const request = require('supertest');

//const db = require('../../../../src/api/database/db');

jest.mock('../../../../src/api/database/UserRepository');

const { getUserByUserName, createUser } = require('../../../../src/api/database/UserRepository')

const ingestApi = require('../../../../src/api/web/ingest/ingestApi');

const { registerApp } = require('../../../../src/app');
const app = registerApp({
    connection: {
        readyState: 1
    }
});

describe('GET /api/ingest', () => {
    beforeEach(() => {
        getUserByUserName.mockClear();
        createUser.mockClear();
    });

    /*
    afterAll(async () => {
        await db.disconnect();
    });
    */

    test('should success', async () => {
        ingestApi.registerIngestApi(app);

        getUserByUserName.mockImplementation(() => {
            return []
        });

        createUser.mockImplementation(() => {
            return "SUCCESS";
        });


        return request(app)
            .post(`/api/ingest`, { username: 'fromsupertest' })
            .then(response => {
                //console.log(response.body);
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                //expect(response.body.docs).toBe("SUCCESS");
            });
    });
});
