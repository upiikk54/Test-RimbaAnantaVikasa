const express = require("express");
const app = express();
const PORT = 8222;
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// ------------------------- Import Middleware ------------------------- //
const validateUserInput = require("./Middlewares/validateUserInput");
const validateUserInputUpdate = require("./Middlewares/validateUserInputUpdate");
const requestLogger = require("./Middlewares/requestLogger");
// ------------------------- End Import Middleware ------------------------- //

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

// Add request logger middleware
app.use(requestLogger);

// ------------------------- Import Controller ------------------------- //
const userController = require("./Controllers/userController");
// ------------------------- End Import Controller ------------------------- //

// ------------------- Define Routes User ------------------- //
app.post("/users", validateUserInput, userController.createUser);
app.put("/users/:id", validateUserInputUpdate, userController.updateUser);
app.delete("/users/:id", userController.deleteUser);
app.get("/users", userController.getAllUsers);
app.get("/users/:id", userController.getUserById);
// ------------------- End Define Routes User ------------------- //

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server berhasil berjalan di port http://localhost:${process.env.PORT || PORT}`);
});
