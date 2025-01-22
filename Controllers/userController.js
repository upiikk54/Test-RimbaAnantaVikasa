const UserService = require("../Services/userService");

// ------------------------- Create User ------------------------- //
const createUser = async (req, res) => {
    const {
        name,
        email,
        age
    } = req.body;

    const {
        status,
        statusCode,
        message,
        data
    } = await UserService.createUser({
        name,
        email,
        age
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data
    });
};
// ------------------------- End Create User ------------------------- //

// ------------------------- Update User By Id ------------------------- //
const updateUser = async (req, res, next) => {
    const {
        id
    } = req.params;
    const {
        name,
        email,
        age
    } = req.body;
    

    const {
        status,
        statusCode,
        message,
        data
    } = await UserService.updateUser({
        id,
        name,
        email,
        age
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- End Update User By Id ------------------------- //

// ------------------------- Delete User By Id ------------------------- //
const deleteUser = async (req, res) => {
    const {
        id
    } = req.params;

    const {
        status,
        statusCode,
        message,
        data
    } = await UserService.deleteUser({
        id
    });
    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- End Delete User By Id ------------------------- //

// ------------------------- Get All Users ------------------------- //
const getAllUsers = async (req, res) => {
    const {
        status,
        statusCode,
        message,
        data
    } = await UserService.getAllUsers();

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- End Get All Users ------------------------- //

// ------------------------- Get User By Id ------------------------- //
const getUserById = async (req, res) => {
    const {
        id
    } = req.params;

    const {
        status,
        statusCode,
        message,
        data
    } = await UserService.getUserById({
        id
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- End Get User By Id ------------------------- //

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserById
};

