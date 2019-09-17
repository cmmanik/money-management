const regisTration = data => {
        const errrors = {};

        if (!data.balance) {
                errrors.balance = 'Please Provide your Balance';
        }

        if (!data.type) {
                errrors.type = 'Please Provide Balance Type';
        }
        return {
                errrors,
                isValid: Object.keys(errrors).length === 0,
        };
};

module.exports = regisTration;
