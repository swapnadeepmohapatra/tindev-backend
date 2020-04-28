const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use('/', (req, res) => {
	res.json({ message: 'Welcome to Tindev' });
});

const port = process.env.PORT || 4242;
app.listen(port, () => {
	console.log(`Listening to port ${port}`);
});
