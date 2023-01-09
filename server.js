const express = require('express')
const userRoutes = require('./routers/user-routes')
const productRoutes = require('./routers/product-routes')
const profileRoutes = require('./routers/profile-routes')




const app = express()
const db = require('./models')


app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/',userRoutes)
app.use('/',productRoutes)
app.use('/',profileRoutes)

db.sequelize.sync().then(()=>{
    app.listen(3000,()=>console.log('server is running in port 3000'))
})


