const express = require('express')
const route = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const db = require('../models')
route.post('/register',(req,res)=>{

    db.User.count({where:{email:req.body.email}}).then(doc=>{
        if(doc!=0){
            res.status(400).send("this email is exist")
        }{
            bcrypt.hash(req.body.password,10).then(hashedPassword=>{
                    db.User.create({
                         username:req.body.username,
                         email:req.body.email,
                         password:hashedPassword
                            }).then((response)=>res.status(200).send(response))
                              .catch((err)=>res.status(400).send(err))

            })
        }
    })





})

route.get('/user/:id',(req,res,next)=>{
    db.User.findOne({where:{id:req.params.id},include:[db.Profile,db.Product]})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})

route.get('/users',(req,res,next)=>{
    db.User.findAll()
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})

route.patch('/user/:id',(req,res,next)=>{
    db.User.update({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    },{where:{id:req.params.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})

route.delete('/user/:id',(req,res,next)=>{
    db.User.destroy({where:{id:req.params.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})

module.exports = route