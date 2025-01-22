const { check, validationResult } = require('express-validator');

const validateUserInput = [
    check('name')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Name is required'),

    check('email')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Email is required')
        .withMessage('Please provide a valid email'),

    check('age')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Age is required')
        .isInt()
        .withMessage('Age must be a number')
        .custom(value => {
            if (value < 0 || value > 100) {
                throw new Error('Age must be between 0 and 100');
            }
            return true;
        }),

    (req, res, next) => {
        console.log('Validating request body:', req.body); // Debug log

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'error',
                errors: errors.array()
            });
        }
        next();
    }
];

module.exports = validateUserInput;