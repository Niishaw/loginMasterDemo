const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

//Connect to DB
connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ msg: 'Welcome to Ursus API....' }));

//Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/userLists', require('./routes/userLists'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
