const router = require('express').Router();
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const auth = require('../auth.js');

// get all transaction
router.get('/', auth, (req, res) => {
        Transaction.find()
                .then(trans => {
                        if (trans.length === 0) {
                                res.status(200).json({ message: 'No data found!' });
                        } else {
                                res.status(200).json(trans);
                        }
                })
                .catch(() => {
                        res.status(502).json({ message: 'Please Try agian Later!' });
                });
});

// get a single transaction
router.get('/:transactionId', (req, res) => {
        const { transactionId } = req.params;
        Transaction.findById(transactionId)
                .then(transaction => {
                        if (!transaction) {
                                res.status(204).json({ message: 'No data found!' });
                        } else {
                                res.status(200).json(transaction);
                        }
                })
                .catch(() => {
                        res.status(502).json({ message: 'Please Try agian Later!' });
                });
});

// create a transaction
router.post('/', auth, (req, res) => {
        const { balance, type, note } = req.body;
        const userId = req.user._id;
        const transaction = new Transaction({ balance, type, note, author: userId });
        transaction
                .save()
                .then(trans => {
                        const updatedUser = { ...req.user._doc };
                        if (type === 'income') {
                                updatedUser.balance += balance;
                                updatedUser.income += balance;
                        } else if (type === 'expense') {
                                updatedUser.expense -= balance;
                                updatedUser.expense += balance;
                        }
                        updatedUser.transactions.unshift(trans._id);
                        return User.findByIdAndUpdate(userId, { $set: updatedUser });
                })
                .then(response => {
                        console.log('final restur', response);
                        res.status(201).json({
                                message: 'Transaction Created Succesfully!',
                                ...response._doc,
                        });
                })
                .catch(() => {
                        res.status(502).json({ message: 'Please Try agian Later!' });
                });
});

// edite a transtion
router.put('/:transactionId', auth, (req, res) => {
        const { transactionId } = req.params;
        User.findByIdAndUpdate(transactionId, { $set: req.body })
                .then(response => {
                        res.status(200).json({
                                message: 'Update Succesfully',
                                ...response,
                        });
                })
                .catch(() => {
                        res.status(502).json({ message: 'Please Try agian Later!' });
                });
});

// delete a transaction
router.delete('/:transactionId', auth, auth, (req, res) => {
        const { transactionId } = req.params;
        console.log(transactionId);
        User.findByIdAndRemove(transactionId)
                .then(result => {
                        res.status(200).json({
                                message: 'Deleter Succesfully',
                                ...result,
                        });
                })
                .catch(() => {
                        res.status(502).json({ message: 'Please Try agian Later!' });
                });
});

module.exports = router;
