// const connectToMongo = require('./db');
// const express = require('express')

// connectToMongo();
// const app = express()
// const port = 3000

// app.use(express.json())

// // Available Routes
// app.use('/api/auth', require('./routes/auth'))
// app.use('/api/notes', require('./routes/notes'))


// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })

const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors')


connectToMongo();

const app = express()
const port = 3000
app.use(cors())


app.use(express.json());

app.use('/api/auth', require('./routes/Auth'))
app.use('/api/notes', require('./routes/Notes'))


app.listen(port,
    () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
