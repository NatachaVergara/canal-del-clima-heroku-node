const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const PORT = process.env.PORT || 5000
require('dotenv').config()

const app = express()
//middleware Rate limiting. Limita la cantidad de busqueda que puede hacer un usario en minutos
const limiter = rateLimit({
    windowMs: 10 * 60 * 60 * 1000, //10 min
    max:50
})
app.use(limiter)
app.set('trust proxy', 1)
//rutas estaticas
app.use(express.static('public'))


//Rutas
app.use('/api', require('./routes/routes'))

//Usar cors
app.use(cors())

app.listen(PORT, () =>console.log(`Servidor activo en puerto: ${PORT}`))