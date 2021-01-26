const express = require('express')
require("./src/database/mongoose")

const app = express()
const port = 3000



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/', async (req, res) => {
    res.send('Hello World!')
})