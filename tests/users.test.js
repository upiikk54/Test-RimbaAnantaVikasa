const request = require('supertest');
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("../models");
const { Op } = require("sequelize");

// Import Controller dan Middleware yang diperlukan
const userController = require("../Controllers/userController");
const validateUserInput = require("../Middlewares/validateUserInput");

// Setup express app untuk testing
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.post("/users", validateUserInput, userController.createUser);

describe('User Routes', () => {
    // Prefix untuk membedakan data test
    const TEST_PREFIX = 'TEST_';
    
    const validUser = {
        name: "John Doe",
        email: "john.doe@example.com",
        age: 25
    };

    // Membersihkan data test sebelum setiap test
    beforeEach(async () => {
        await db.Users.destroy({
            where: {
                name: {
                    [Op.like]: `${TEST_PREFIX}%`
                }
            }
        });
    });

    // Membersihkan data test setelah semua test selesai
    afterAll(async () => {
        await db.Users.destroy({
            where: {
                name: {
                    [Op.like]: `${TEST_PREFIX}%`
                }
            }
        });
        await db.sequelize.close();
    });

    describe('POST /users', () => {
        it('should create a new user with valid data', async () => {
            const response = await request(app)
                .post('/users')
                .send(validUser);

            expect(response.status).toBe(201);
            expect(response.body.status).toBe('success');
            expect(response.body.message).toBe('Success Create User');
            expect(response.body.data).toBeTruthy();
            expect(response.body.data.id).toBeTruthy();
            expect(response.body.data.name).toBe(validUser.name);
            expect(response.body.data.email).toBe(validUser.email);
            expect(response.body.data.age).toBe(validUser.age);
        });

        it('should fail when name is missing', async () => {
            const invalidUser = { ...validUser };
            delete invalidUser.name;

            const response = await request(app)
                .post('/users')
                .send(invalidUser);

            expect(response.status).toBe(400);
            expect(response.body.status).toBe('error');
            expect(response.body).toHaveProperty('errors');
            expect(response.body.errors[0].msg).toBe('Name is required');
        });

        it('should fail when email is invalid', async () => {
            const invalidUser = {
                ...validUser,
                email: 'invalid-email'
            };

            const response = await request(app)
                .post('/users')
                .send(invalidUser);

            expect(response.status).toBe(400);
            expect(response.body.status).toBe('error');
            expect(response.body).toHaveProperty('errors');
            expect(response.body.errors[0].msg).toBe('Please provide a valid email');
        });

        it('should fail when age is out of range', async () => {
            const invalidUser = {
                ...validUser,
                age: 150
            };

            const response = await request(app)
                .post('/users')
                .send(invalidUser);

            expect(response.status).toBe(400);
            expect(response.body.status).toBe('error');
            expect(response.body).toHaveProperty('errors');
            expect(response.body.errors[0].msg).toBe('Age must be a number between 0 and 100');
        });

        it('should fail when email already exists', async () => {
            // Buat user pertama
            const existingUser = await db.Users.create(validUser);
            expect(existingUser).toBeTruthy();

            // Coba buat user dengan email yang sama
            const response = await request(app)
                .post('/users')
                .send(validUser);

            expect(response.status).toBe(400);
            expect(response.body.status).toBe('error');
            expect(response.body.message).toBe('Email already exists');
        });
    });
});