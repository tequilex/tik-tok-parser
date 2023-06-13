const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const path = require('path')
const axios = require('axios');
const HTMLParser = require('node-html-parser');

const deer = path.resolve(__dirname, '../dist/index.html')

const PORT = 8080

const app = express()
app.use(cors())
app.use(bodyParser.json());

let data = {}

const urlencodedParser = express.urlencoded({extended: false});

app.post("/", (request, response) => {
  console.log(request.body);
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
})