const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

router.post('/signup', async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = User({ email, password });
		await user.save();
		const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
		console.log(req.body + ' ' + token);
		res.send({ token });
	} catch (err) {
		return res.status(422).json(err.message);
	}
});

router.post('/signin', async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(422).send({ error: 'Must provide email and password.' });
	}

	const user = await User.findOne({ email });
	if (!user) {
		return res.status(422).send({ error: 'Invalid email or password.' });
	}

	try {
		await user.comparePassword(password);
		const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
		res.send({ token });
	} catch (err) {
		return res.status(422).send({ error: 'Invalid email or password.' });
	}
});

module.exports = router;
