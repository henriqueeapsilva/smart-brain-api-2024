const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'henriquesilva',
      password: '',
      database: 'smart-brain',
    },
});

const app = express();

// essential to read the data
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('success');
})

app.post('/signin', signin.handleSignIn(db, bcrypt));

app.post('/register', register.handleRegister(db, bcrypt));

app.get('/profile/:id', profile.handleProfileGet(db));

app.put('/image', image.handleImage(db));

app.post('/imageurl', image.handleApiCall());

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is listenning on port ${PORT}`);
})

