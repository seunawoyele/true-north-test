const express = require('express')
const app = express()
const models = require("./models");


app.get('/', (req, res) => res.send('testing!'))


app.get('/restorants', function (req, res) {

    models.Restorant.findAll({
        include: [{
            model: models.Review
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




app.listen(3000, () => console.log('my server is running'))