const express = require('express')
const app = express()
const models = require("./models");
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('testing!'))


app.get('/restorants', function (req, res) {

    models.Restorant.findAll({
        include: [{
            model: models.Review,
            exclude: ['restorantId']
        },
        {
            model: models.Meal
        }
        ]
    }

    ).then(rests => {
        res.send(rests)
    })

})


app.delete('/restorant/:id', (req, res) => {
    models.Restorant.destroy({
        where: {
            id: req.params.id
        }
    }).then(result => { ///ok
        res.send("ok")
    }).catch(error => { ///error
        res.send(error)
    })

})


app.post('/restorant/review/:resId', (req, res) => {

    let myObject = req.body;
    myObject.restorantId = Number(req.params.resId);
    myObject.id = 2;
    console.log(myObject)
    models.Review.build(myObject).save().then(result => { ///ok
        res.send(result)
    }).catch(error => { ///error
        res.send(error)
    })

})




app.listen(3000, () => console.log('my server is running'))