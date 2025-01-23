const {
    Users
} = require("../models");

class UserRepository {
    static async createUser({
        name,
        email,
        age
    }) {
        const createdUser = await Users.create({
            name,
            email,
            age
        });

        return createdUser;

    }

    // ------------------------- Get User By Id ------------------------- //
    static async getUserById({
        id
    }) {
        const getUser = await Users.findOne({
            where: {
                id
            }
        });

        return getUser;
    };
    // ------------------------- End Get User By Id ------------------------- //

    // ------------------------- Update User By Id ------------------------- //
    static async updateUser({
        id,
        name,
        email,
        age
    }) {
        const updatedUser = await Users.update({
            name,
            email,
            age
        }, {
            where: {
                id
            }
        });

        return updatedUser;
    }
    // ------------------------- End Update User By Id ------------------------- //

    // ------------------------- Delete User By Id ------------------------- //
    static async deleteUser({
        id
    }) {
        const deletedUser = await Users.destroy({
            where: {
                id
            }
        });

        return deletedUser;
    }
    // ------------------------- End Delete User By Id ------------------------- //

    // ------------------------- Get All Users ------------------------- //
    static async getAllUsers() {
        const allUsers = await Users.findAll();
        return allUsers;
    }
    // ------------------------- End Get All Users ------------------------- //
}

module.exports = UserRepository;