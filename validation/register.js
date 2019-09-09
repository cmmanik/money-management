const validator = require('validator');

const regisTration = data => {
        const errrors = {};

        if (!data.firstName) {
                errrors.firstName = 'Please Provide your first name';
        } else if (!validator.isLength(data.firstName, { min: 3, max: 25 })) {
                errrors.firstName = 'First name must be 3 to 25 Chracter';
        }
        if (!data.lastName) {
                errrors.lastName = 'Please Provide your Last name';
        } else if (!validator.isLength(data.lastName, { min: 3, max: 25 })) {
                errrors.lastName = 'First name must be 3 to 25 Chracter';
        }
        if (!data.email) {
                errrors.email = 'Please Provide your Email';
        } else if (!validator.isEmail(data.email)) {
                errrors.email = 'Please Provide your Valid Email';
        }
        if (!data.password) {
                errrors.password = 'Please Provide your Password';
        } else if (!validator.isLength(data.password, { min: 6, max: 25 })) {
                errrors.password = 'Password  must be 6 to 25 Chracter';
        }
        if (!data.password2) {
                errrors.password2 = 'Confirm Password must be required!';
        } else if (!validator.equals(data.password, data.password2)) {
                errrors.password2 = 'Confirm Password must be Match!';
        }
        return {
                errrors,
                isValid: Object.keys(errrors).length === 0,
        };
};

module.exports = regisTration;
