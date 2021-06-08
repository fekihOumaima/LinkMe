const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
const fileupload = require('express-fileupload');
const path = require('path');
//connect DataBase
connectDB();

app.use(cors({ origin:'*'}));
// Init Middleware
app.use(express.json({ extended: false}));
app.use(fileupload());
app.get('/', (req,res)=> res.send('API Running'));

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profileUser', require('./routes/api/profileUser'));
app.use('/api/profileCompany', require('./routes/api/profileCompany'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/authUser', require('./routes/api/authUser'));
app.use('/api/authCompany', require('./routes/api/authCompany'));
app.use('/api/company', require('./routes/api/company'));

app.use(express.static(path.join(__dirname,"uploads")));

const PORT = process.env.PORT || 5000;

app.listen(PORT , () => console.log(`server started on port ${PORT}`));