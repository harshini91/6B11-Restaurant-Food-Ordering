const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecret = "ThisIsMyFirstEverWebApplicationIMade";

router.post('/createuser', [
    body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 }),
    body('name').isLength({ min: 5 })], async (req, res) => {

        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400)
                .json({ errors: error.array() })
        };

        const salt = await  bcrypt.genSalt(10);
        let secPassword = await  bcrypt.hash(req.body.password, salt);

        try {
            await User.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: secPassword,
            })
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })

router.post('/loginuser', [body('email').isEmail(),
body('password', 'Incorrect Password').isLength({ min: 5 })],
    async (req, res) => {
        let email = req.body.email;
        let password = req.body.password;

        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400)
                .json({ errors: error.array() })
        };

        try {
            let userData = await User.findOne({email});
            if (!userData) {
                return res.status(400).json({ errors: "Email does not exist" });
            }

            const pwdCompare = await bcrypt.compare(password, userData.password);
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Invalid Password" });
            }

            const data = {
                user: {
                    id:  userData.id,
                }
            }

            const authToken = jwt.sign(data,jwtSecret);
            return res.json({ success: true , authToken:authToken });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })

module.exports = router;