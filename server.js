const express = require('express')
const app = express();
var db = require('./models');
app.use(express.urlencoded({extended: false}))

app.get('/', function(req,res){
    res.send('Home page yo')
})

function logError(error){
    console.log(error)
    res.send({'message': 'There was an error'});
}

app.get('/pets', function(req,res){
    db.pet.findAll()
    .then(function(pets){
        res.json(pets)
    })
    .catch(logError)
})

app.get('/pets/:id', function(req,res){
    db.pet.findByPk(parseInt(req.params.id))
    .then(function(foundUser){
        if (!foundUser){
            res.send({'message': 'no pet here mannnn'})
        } else {
            res.json(foundUser)
        }
    })
    .catch(logError)
})

app.put('/pets/:id', function(req, res){
    db.pet.update(req.body,{
        where: {
            id: parseInt(req.params.id)
        }
    }).then(function(arrayOfUpdated){
        console.log(arrayOfUpdated)
        res.redirect(`/pets/${req.params.id}`)
    })
})

app.post('/pets', function(req,res){
    db.pet.findOrCreate({
        where: {
            name: req.body.name
        },
        defaults: {
            type: req.body.type,
            age: req.body.age,
        }
    }).then(function([pet,created]){
        console.log(`${pet.firstName} was ${created ? 'created' : 'found'}`)
        res.redirect('/pets')
    })
})

app.delete('/pets/:id', function(req,res){
    db.pet.destroy({
        where : {
            id: parseInt(req.params.id)
        }
    }).then(function(numOfDeleted){
        res.redirect('/pets')
    })
})

app.listen(3000, function(){
    console.log('Listening on port 3000 yo')
})