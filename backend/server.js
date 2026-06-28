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