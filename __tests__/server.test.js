'use strict';
require('dotenv').config();
const { server } = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const request = supergoose(server);

let id;
describe('API check for routes ', () => {
    it('Invalid routes handler check', async () => {
        const response = await request.get('/bad');
        expect(response.status).toEqual(404);
    });
    it('Invalid handler', async () => {
        const response = await request.post('/error');
        expect(response.status).toEqual(404);
    });
    it('Get all the clothes on get /clothes', async () => {
        const response = await request.get('/api/v1/clothes');
        expect(response.status).toEqual(200);
    });

    it('Create new clothes a clothes on POST/clothes', async () => {
        const obj = {
            name: 'pants',
            type: 'jeans',
        };
        const response = await request.post('/api/v1/clothes').send(obj);
        expect(response.status).toEqual(201);
        expect(response.body.name).toEqual('pants');
        id = response.body._id;
    });
    it('Get a specfic clothes on Get/clothes/:id', async () => {
        const response = await request.get(`/api/v1/clothes/${id}`);
        expect(response.status).toEqual(200);
        expect(response.body[0].name).toEqual('pants');
    });

    it('Should update a clothes on PUT/clothes', async () => {
        const response = await request.put(`/api/v1/clothes/${id}`).send({
            name: 'jacket',
            type: 'leather',
        });
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('jacket');
    });
    it(`Should delete a clothes on DELETE/clothes`, async () => {
        const response = await request.delete(`/api/v1/clothes/${id}`);
        expect(response.status).toEqual(200);
    });






    it('Get all the food on get/food', async () => {
        const response = await request.get('/api/v1/food');
        expect(response.status).toEqual(200);
    });
    it('Create new food on POST/food', async () => {
        const obj = {
            name: 'burger',
            ingerd: 'meat'
        };
        const response = await request.post('/api/v1/food').send(obj);
        expect(response.status).toEqual(201);
        expect(response.body.name).toEqual('burger');
        id = response.body._id;
    });
    it('Get a specfic food on Get/food/:id', async () => {
        const response = await request.get(`/api/v1/food/${id}`);
        expect(response.status).toEqual(200);
        expect(response.body[0].name).toEqual('burger');
    });
    it('Update food on PUT /food', async () => {
        const response = await request.put(`/api/v1/food/${id}`).send({
            name: 'hotdog',
            ingerd: 'meat',
        });
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('hotdog');
    });
    it(`Delete a food on DELETE / food`, async () => {
        const response = await request.delete(`/api/v1/food/${id}`);
        expect(response.status).toEqual(200);
    });
});