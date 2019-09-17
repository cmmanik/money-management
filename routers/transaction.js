const router = require('express').Router();
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const auth = require('../auth.js');
const transactionValidaor = require('../validation/transaction');
// get all transaction
router.get('/', auth, (req, res) => {
        const userId = req.user._id;
        Transaction.find({ author: userId })
                .then(trans => {
                        if (trans.length === 0) {
                                return res.status(404).json({ message: 'No data found!' });
                        }
                        res.status(200).json(trans);
                })
                .catch(() => {
                        res.status(502).json({ message: 'Please Try agian Later!' });
                });
});

// get a single transaction
router.get('/:transactionId', (req, res) => {
        const { transactionId } = req.params;
        console.log(transactionId);
        Transaction.findById(transactionId)
                .then(transction => {
                        if (transction) {
                                res.status(200).json(transction);
                        } else {
                                res.status(204).json({ message: 'No data found!' });
                        }
                })
                .catch(() => {
                        res.status(502).json({ message: 'Please Try agian Later!' });
                });
});

// create a transaction
router.post('/', auth, (req, res) => {
        const transactonValid = transactionValidaor(req.body);
        if (!transactonValid.isValid) {
                return res.status(400).json(transactonValid.errrors);
        }
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
                                updatedUser.balance -= balance;
                                updatedUser.expense += balance;
                        }
                        updatedUser.transactions.unshift(trans._id);
                        User.findByIdAndUpdate(updatedUser._id, { $set: updatedUser }, { new: true }, (err, doc) => {
                                Transaction.find({ author: userId }).then(updateTrans => {
                                        if (trans.length === 0) {
                                                res.status(200).json({ message: 'No data found!' });
                                        } else {
                                                res.status(200).json(updateTrans);
                                        }
                                });
                        });
                })
                .catch(err => {
                        res.status(502).json({ message: 'Please Try agian Later!', err });
                });
});

// edite a transtion
router.put('/:transactionId', auth, (req, res) => {
        const { transactionId } = req.params;
        Transaction.findByIdAndUpdate(transactionId, { $set: req.body })
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
        Transaction.findByIdAndRemove(transactionId)
                .then(result => {
                        if (result) {
                                res.status(200).json({
                                        message: 'Deleter Succesfully',
                                        ...result,
                                });
                        } else {
                                res.status(404).json({ message: 'Not found' });
                        }
                })
                .catch(() => {
                        res.status(502).json({ message: 'Please Try agian Later!' });
                });
});

module.exports = router;
