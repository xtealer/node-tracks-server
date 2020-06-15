require('./models/User');
require('./models/Track');
const mongoUri =
	'mongodb+srv://testdb:zrnZXUxky7y9dx3l@chinitocluster-cf3vm.mongodb.net/test?retryWrites=true&w=majority';
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const requireAuth = require('./middlewares/requireAuth');
const trackRoutes = require('./routes/trackRoutes');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

mongoose.connect(mongoUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
	console.log('Connected to mongodb instance.');
});
mongoose.connection.on('error', (err) => {
	console.error('Error connecting to mongodb instance.', err);
});

app.get('/', requireAuth, (req, res) => {
	res.send(`Your email is ${req.user.email}`);
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`));
