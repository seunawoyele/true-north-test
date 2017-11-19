const express = require('express')
const app = express()
const models = require("./models");
const bodyParser = require('body-parser');

app.use(bodyParser.json()); ///to get json format

app.get('/', (req, res) => res.send('testing!'))

/**
 * GET
 * to list restorants
 */
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


/**
 * DELETE
 * to delete some restorant and nodes by id
 */
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


/**
 * POST
 * create a review for restorant
 */
app.post('/restorant/review/:resId', (req, res) => {

    let myObject = req.body;
    myObject.restorantId = parseInt(req.params.resId);
    myObject.id = 3;
    console.log(myObject)
    models.Review.build(myObject).save().then(result => { ///ok
        res.send(result)
    }).catch(error => { ///error
        throw new Error(error);
    })

})



/**
 * PUT
 * update restorant
 */
app.put('/restorant/:resId', (req, res) => {

    ///the restorant filter
    let myFIlter = {
        where: {
            id: parseInt(req.params.resId)
        },
        include: [
            { model: models.Meal }
        ]
    };

    let myObject = req.body;

    models.Restorant.findOne(myFIlter).then(function (resto) {
        if (resto) {
            resto.update(myObject).then(data => {
                res.send(resto)
            }).catch(error => {
                throw new Error("Error updating restorant");
            })

        } else {
            throw new Error("no such restorant exist to update");
        }
    });

})


app.listen(3000, () => console.log('my server is running'))