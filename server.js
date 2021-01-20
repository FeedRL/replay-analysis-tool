const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'Frontend/build')));

// Put all API endpoints under '/api'
app.get('/', (req, res) => {
    res.send('Hello World!')
  })

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);