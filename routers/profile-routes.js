const express = require('express')
const route = express.Router()

const db = require('../models')
route.post('/createProfile',(req,res)=>{
    db.Profile.create({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        country:req.body.country,
        UserId:req.body.UserId
    }).then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})

route.get('/Profile/:id',(req,res,next)=>{
    db.Profile.findOne({where:{id:req.params.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})

route.get('/Profiles',(req,res,next)=>{
    db.Profile.findAll({include:[db.User]})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})

route.patch('/Profile/:id',(req,res,next)=>{
    db.Profile.update({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        country:req.body.country
    },{where:{id:req.params.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})

route.delete('/Profile/:id',(req,res,next)=>{
    db.Profile.destroy({where:{id:req.params.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})

module.exports = route