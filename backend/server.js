const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();


app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    res.json({ message: 'Server radi'});
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
   console.log(`Server radi na http://localhost:${PORT}`);
})

const pool = require('./db');

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const jobRouters = require('./routes/jobRoutes');
app.use('/api/jobs', jobRouters);
