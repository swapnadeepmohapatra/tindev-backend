const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const connectedUsers = {};

const userRoutes = require('./routes/user');

mongoose
	.connect('mongodb://localhost:27017/tindev', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log('DB Connected');
	})
	.catch((error) => {
		console.log(error);
	});

io.on('connection', (socket) => {
	const { user } = socket.handshake.query;

	connectedUsers[user] = socket.id;
});

app.use((req, res, next) => {
	req.io = io;
	req.connectedUsers = connectedUsers;

	return next();
});

app.use(cors());

app.use(express.json());

app.use('/api', userRoutes);

app.use('/', (req, res) => {
	res.json({ message: 'Welcome to Tindev' });
});

const port = process.env.PORT || 4242;
server.listen(port, () => {
	console.log(`Listening to port ${port}`);
});
