// using express fo r HTTP
const express= require('express');
const app = express();

// GET root
app.get('/', (req, res) => {
    res.send('GET OUT OF MY ROOT!');
});

// open to localhost:6900
app.listen(6900, () => console.log('Send gambina.jpgs to 6900 now'));