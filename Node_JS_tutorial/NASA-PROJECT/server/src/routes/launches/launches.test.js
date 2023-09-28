const request = require('supertest');
const app = require('../../app');
const { 
    mongoConnect,
    mongoDisconnect,
} = require('../../services/mongo');

describe('Launches API', () => {
    beforeAll(async () => {
        await mongoConnect();
    });

    afterAll(async() => {
        await mongoDisconnect();
    });

    describe('Test GET/launches', () => {
        test('It should respond with 200 success', async () => {
            const response = await request(app)
                .get('/v1/launches')
                .expect('Content-Type', /json/)
                .expect(200);
        })
    });
    
    describe('Test POST/launches', () => {
        const completDatawithDate = {
            mission: 'USS',
            rocket: 'NCC',
            target: 'Kepler-62 f',
            launchDate: 'january 5, 2028',
        };
    
        const DatawithoutDate = {
            mission: 'USS',
            rocket: 'NCC',
            target: 'Kepler-62 f',
        };
    
        const DatawithInvaldiDate = { 
            mission: 'USS',
            rocket: 'NCC',
            target: 'Kepler-62 f',
            launchDate: 'Hi',
        }
        test('It should respond with 201 created', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(completDatawithDate)
                .expect('Content-Type', /json/)
                .expect(201);
            
            const requestDate = new Date(completDatawithDate.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
            expect(responseDate).toBe(requestDate);
    
            expect(response.body).toMatchObject(DatawithoutDate);
        });
        
        test('It should catch missing reqeuired properties', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(DatawithoutDate)
                .expect('Content-Type', /json/)
                .expect(400);
            
            expect(response.body).toStrictEqual({
                error: 'Missing required launch property',
            });
        });
    
        test('It should catch invalid dates', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(DatawithInvaldiDate)
                .expect('Content-Type', /json/)
                .expect(404);
            
            expect(response.body).toStrictEqual({
                error: 'Invalid launch date',
            });
        });
    });
});
