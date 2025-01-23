const userRepository = require("../Repositories/userRepository");

class UserService {
    // ------------------------- Create User ------------------------- //
    static async createUser({
        name,
        email,
        age
    }) {
        try {
            const createdUser = await userRepository.createUser({
                name,
                email,
                age
            });

            return {
                status: true,
                statusCode: 201,
                message: "User berhasil dibuat.",
                data: {
                    createdUser: createdUser,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 400,
                message: "Sumber tidak ada.",
                data: {
                    createdUser: null,
                },
            };
        }
    };
    // ------------------------- End Create User ------------------------- //

    // ------------------------- Update User By Id ------------------------- //
    static async updateUser({
        id,
        name,
        email,
        age
    }) {
        try {
            const getUserById = await userRepository.getUserById({
                id
            });

            if (getUserById.id == id) {

                const updatedUser = await userRepository.updateUser({
                    id,
                    name,
                    email,
                    age
                });

                return {
                    status: true,
                    statusCode: 200,
                    message: "User telah berhasil diperbarui",
                    data: {
                        updatedUser: updatedUser,
                    },
                };
            } else {
                return {
                    status: false,
                    statusCode: 401,
                    message: "User tidak ditemukan.",
                    data: {
                        updatedUser: null,
                    },
                };
            }
        } catch (err) {
            return {
                status: false,
                statusCode: 400,
                message: "Sumber tidak ada.",
                data: {
                    updatedUser: null,
                },
            };
        }
    };
    // ------------------------- End Update User By Id ------------------------- //

    // ------------------------- Delete User By Id ------------------------- //
    static async deleteUser({
        id
    }) {
        try {
            const getUserById = await userRepository.getUserById({
                id
            });

            if (getUserById.id == id) {
                const deletedUser = await userRepository.deleteUser({
                    id
                });

                return {
                    status: true,
                    statusCode: 200,
                    message: "User telah berhasil dihapus",
                    data: {
                        deletedUser: deletedUser,
                    },
                };
            } else {
                return {
                    status: false,
                    statusCode: 401,
                    message: "User tidak ditemukan.",
                    data: {
                        deletedUser: null,
                    },
                };
            }
        } catch (err) {
            return {
                status: false,
                statusCode: 400,
                message: "Sumber tidak ada.",
                data: {
                    deletedUser: null,
                },
            };
        }
    }
    // ------------------------- End Delete User By Id ------------------------- //

    // ------------------------- Get All Users ------------------------- //
    static async getAllUsers() {
        try {
            const allUsers = await userRepository.getAllUsers();

            return {
                status: true,
                statusCode: 200,
                message: "User berhasil diambil",
                data: {
                    allUsers: allUsers,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 400,
                message: "Sumber tidak ada.",
                data: {
                    allUsers: null,
                },
            };
        }
    }
    // ------------------------- End Get All Users ------------------------- //

    // ------------------------- Get User By Id ------------------------- //
    static async getUserById({
        id
    }) {
        try {
            const getUserById = await userRepository.getUserById({
                id
            });

            if (getUserById.id == id) {
                return {
                    status: true,
                    statusCode: 200,
                    message: "User berhasil diambil",
                    data: {
                        getUserById: getUserById,
                    },
                };
            } else {
                return {
                    status: false,
                    statusCode: 400,
                    message: "User tidak ditemukan.",
                    data: {
                        getUserById: null,
                    },
                };
            }

        } catch (err) {
            return {
                status: false,
                statusCode: 400,
                message: "Sumber tidak ada.",
                data: {
                    getUserById: null,
                },
            };
        }
    }
    // ------------------------- End Get User By Id ------------------------- //
}

module.exports = UserService;