const router = require('express').Router();
const regiester = require('../validation/register');
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// register a new user
router.post('/regiester', (req, res) => {
    const validate = regiester(req.body);
    if (!validate.isValid) {
        res.status(400).json(validate.errrors)
    } else {
        let { firstName, lastName, email, password } = req.body;
        User.findOne({ email })
            .then(user => {
                if (user) {
                    return res.status(400).json({ meassage: 'Email Already Exist!' })
                }

                let newUser = new User({
                    firstName,
                    lastName,
                    email,
                    password
                })

                bcrypt.genSalt(10, (err, salt) => {
                    if (!err) {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            newUser.password = hash;
                            newUser.save()
                                .then(result => {
                                    res.status(200).json(result)
                                })
                                .catch(err => {
                                    res.json({ meassage: 'Please try again later' })
                                })
                        })
                    } else {
                        res.json({ meassage: 'Please Try again later!' })
                    }
                })
            }).catch((err) => {
                res.json({ meassage: 'Please try again' })
            });
    }

})



// login User
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.json({ meassage: 'This email not registerd!' })
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if (!err) {
                    if (result) {
                        const payload = {
                            _id: user._id,
                            email: user.email
                        }
                        let token = jwt.sign(payload, 'CMMANIK', { expiresIn: '2h' })
                        return res.status(200).json({ token: `Bearer ${token}`, msg: 'Successuly Login' })
                    }
                    else {
                        return res.json({ msg: 'Password does not match' })
                    }
                }
            })
        })
        .catch(err => res.json(err))
})


module.exports = router;
