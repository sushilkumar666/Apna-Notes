const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { json } = require('express');
const fetchData = require('../middleware/fetchData');
const secret = 'mySecret';

// Create a User using: POST "/api/auth/". Doesn't require Auth
router.post('/createuser', [body('name', 'enter valid name').isLength({ min: 3 }),
body('email', 'enter valid email').isEmail(),
body('password', 'enter valid password').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    console.log('validation ke pehle');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('validation ke pehle');
        return res.status(400).json({ errors: errors.array() });

    }


    try {


        let user = await User.findOne({ email: req.body.email })
        if (user) {
            console.log('user already exists');
            res.json({ success, msg: "user already exists" })
        } else {
            let salt = await bcrypt.genSalt(10)
            let secPassword = req.body.password;
            hashpassword = await bcrypt.hash(secPassword, salt);
            user = await User.create({
                name: req.body.name,
                password: hashpassword,
                email: req.body.email


            })

            const data = {
                user: {
                    id: user.id
                }
            }
            success = true;
            Token = jwt.sign(data, secret);
            res.json({ success, token });

        }
    } catch (error) {
        success = false;
        res.json({ success, "error": "internal server error" });
    }

})


router.post('/login', [
    body("email", 'enter valid email').isEmail(),
    body("password", 'enter valid password').isLength({ min: 5 })

], async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, secret);
        success = true;
        res.json({ success, authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }


});



router.post('/getuser', fetchData, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})



module.exports = router 