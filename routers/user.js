const router = require('express').Router();
const regiester = require('../validation/register');
const User = require('../models/User')
// register a user
router.post('/regiester', (req, res) => {
    const validate = regiester(req.body);
    if(!validate.isValid) {
        res.status(400).json(validate.errrors)
    } else {
        User.findOne(req.body.email)
            .then((result) => {
                
            }).catch((err) => {
                
            });
    }
   
})
// login User
router.post('/login', (req, res) => {
    console.log('login');
})


module.exports = router;