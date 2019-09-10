const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const regiester = require('../validation/register');
const User = require('../models/User');

// register a new user
router.post('/regiester', (req, res) => {
        const validate = regiester(req.body);
        if (!validate.isValid) {
                res.status(400).json(validate.errrors);
        } else {
                const { firstName, lastName, email, password } = req.body;
                User.findOne({ email })
                        .then(user => {
                                const errors = {};
                                if (user) {
                                        errors.email = 'Email Already Exist!';
                                        return res.status(409).json(errors);
                                }

                                const newUser = new User({
                                        firstName,
                                        lastName,
                                        email,
                                        password,
                                });

                                bcrypt.genSalt(10, (err, salt) => {
                                        if (!err) {
                                                bcrypt.hash(newUser.password, salt, (err, hash) => {
                                                        newUser.password = hash;
                                                        newUser.save()
                                                                .then(result => {
                                                                        res.status(200).json({
                                                                                result,
                                                                                msg: 'User Create Succesfully',
                                                                        });
                                                                })
                                                                .catch(err => {
                                                                        res.json({
                                                                                meassage: 'Please try again later',
                                                                        });
                                                                });
                                                });
                                        } else {
                                                res.json({ meassage: 'Please Try again later!' });
                                        }
                                });
                        })
                        .catch(err => {
                                res.json({ meassage: 'Please try again' });
                        });
        }
});

// login User
router.post('/login', (req, res) => {
        const { email, password } = req.body;
        User.findOne({ email })
                .then(user => {
                        if (!user) {
                                return res.status(401).json({ email: 'This email not registerd!' });
                        }
                        bcrypt.compare(password, user.password, (err, result) => {
                                if (!err) {
                                        if (result) {
                                                const payload = {
                                                        _id: user._id,
                                                        email: user.email,
                                                };
                                                const token = jwt.sign(payload, 'CMMANIK', { expiresIn: '2h' });
                                                return res
                                                        .status(200)
                                                        .json({ token: `Bearer ${token}`, msg: 'Successuly Login' });
                                        }

                                        return res.status(401).json({ password: 'Password does not match' });
                                }
                        });
                })
                .catch(err => res.json(err));
});

module.exports = router;
