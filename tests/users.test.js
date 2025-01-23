const request = require('supertest');
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const { Users } = require("../models");
const { v4: uuidv4 } = require('uuid');

// Import Controller and Middleware
const userController = require("../Controllers/userController");
const validateUserInput = require("../Middlewares/validateUserInput");
const validateUserInputUpdate = require("../Middlewares/validateUserInputUpdate");

// Setup express app and routes users for testing
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.post("/users", validateUserInput, userController.createUser);
app.put("/users/:id", validateUserInputUpdate, userController.updateUser);
app.delete("/users/:id", userController.deleteUser);
app.get("/users", userController.getAllUsers);
app.get("/users/:id", userController.getUserById);

describe('User Routes', () => {
    const validUser = {
        name: "John Doe",
        email: "john.doe@example.com",
        age: 25
    };
    beforeEach(async () => {
        await Users.destroy({
            where: {},
            force: true
        });
    });
    afterAll(async () => {
        await Users.destroy({
            where: {},
            force: true
        });
        await Users.sequelize.close();
    });

    describe('POST /users', () => {
        it('should create a new user with valid data', async () => {
            const response = await request(app)
                .post('/users')
                .send(validUser);

            expect(response.status).toBe(201);
            expect(response.body.status).toBe(true);
            expect(response.body.message).toBe("User berhasil dibuat.");
            expect(response.body.data.createdUser).toBeTruthy();
            expect(response.body.data.createdUser.name).toBe(validUser.name);
            expect(response.body.data.createdUser.email).toBe(validUser.email);
            expect(response.body.data.createdUser.age).toBe(validUser.age);
        });

        it('should fail when name is missing', async () => {
            const invalidUser = { ...validUser };
            delete invalidUser.name;

            const response = await request(app)
                .post('/users')
                .send(invalidUser);

            expect(response.status).toBe(400);
            expect(response.body.status).toBe('error');
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
            expect(response.body.errors[0].msg).toBe('Age must be between 0 and 100');
        });

        it('should fail when email already exists', async () => {
            await Users.create(validUser);
            await new Promise(resolve => setTimeout(resolve, 100));

            const response = await request(app)
                .post('/users')
                .send(validUser);

            expect(response.status).toBe(400);
            expect(response.body.status).toBe(false);
            expect(response.body.message).toBe("Sumber tidak ada.");
        });
    });

    describe('GET /users', () => {
        it('should get all users', async () => {
            await Users.create(validUser);
            await Users.create({
                ...validUser,
                email: 'jane@example.com'
            });

            const response = await request(app)
                .get('/users');

            expect(response.status).toBe(200);
            expect(response.body.status).toBe(true);
            expect(response.body.message).toBe("User berhasil diambil");
            expect(Array.isArray(response.body.data.allUsers)).toBe(true);
            expect(response.body.data.allUsers.length).toBe(2);
        });
    });

    describe('GET /users/:id', () => {
        it('should get user by id', async () => {
            const user = await Users.create(validUser);

            const response = await request(app)
                .get(`/users/${user.id}`);

            expect(response.status).toBe(200);
            expect(response.body.status).toBe(true);
            expect(response.body.message).toBe("User berhasil diambil");
            expect(response.body.data.getUserById.id).toBe(user.id);
            expect(response.body.data.getUserById.name).toBe(user.name);
        });

        it('should return error when user not found', async () => {
            const fakeUUID = uuidv4();

            const response = await request(app)
                .get(`/users/${fakeUUID}`);

            expect(response.status).toBe(400);
            expect(response.body.status).toBe(false);
            expect(response.body.message).toBe("Sumber tidak ada.");
        });
    });

    describe('PUT /users/:id', () => {
        it('should update user successfully', async () => {
            const user = await Users.create(validUser);
            const updateData = {
                name: "John Updated",
                email: "john.updated@example.com",
                age: 30
            };

            const response = await request(app)
                .put(`/users/${user.id}`)
                .send(updateData);

            expect(response.status).toBe(200);
            expect(response.body.status).toBe(true);
            expect(response.body.message).toBe("User telah berhasil diperbarui");
            expect(response.body.data.updatedUser).toBeTruthy();
        });

        it('should fail when updating non-existent user', async () => {
            const fakeUUID = uuidv4();

            const response = await request(app)
                .put(`/users/${fakeUUID}`)
                .send(validUser);

            expect(response.status).toBe(400);
            expect(response.body.status).toBe(false);
            expect(response.body.message).toBe("Sumber tidak ada.");
        });
    });

    describe('DELETE /users/:id', () => {
        it('should delete user successfully', async () => {
            const user = await Users.create(validUser);

            const response = await request(app)
                .delete(`/users/${user.id}`);

            expect(response.status).toBe(200);
            expect(response.body.status).toBe(true);
            expect(response.body.message).toBe("User telah berhasil dihapus");
        });

        it('should fail when deleting non-existent user', async () => {
            const fakeUUID = uuidv4();

            const response = await request(app)
                .delete(`/users/${fakeUUID}`);

            expect(response.status).toBe(400);
            expect(response.body.status).toBe(false);
            expect(response.body.message).toBe("Sumber tidak ada.");
        });
    });
});