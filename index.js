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
            model: models.Meal, as: "meals"
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
    myObject.id = 4;
    console.log(myObject)
    models.Review.build(myObject).save().then(result => { ///ok
        let success = { "success": true, "msg": "restorant review posted" }
        res.send(success)
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
            { model: models.Meal, as: 'meals' }
        ]
    };

    let myObject = req.body;

    models.Restorant.findOne(myFIlter).then(function (resto) {
        if (resto) {
            resto.update(myObject, {
                include: [{
                    model: models.Meal,
                    as: 'meals'
                }]
            }).then(data => {
                res.send(resto)
            }).catch(error => {
                throw new Error("Error updating restorant");
            })

        } else {
            throw new Error("no such restorant exist to update");
        }
    });

})



/**
 * POST
 * create new order
 */
app.post('/order', (req, res) => {

    let myObject = req.body;

    models.Order.create(myObject, {
        include: [{
            model: models.OrderDetail,
            as: 'details'
        }]
    }).then(function (instance) {
        console.log(instance)
        let success = { "success": true, "msg": "order #"+instance.dataValues.id+" created" }
        res.send(success)
    }).catch(function (err) {
        console.error(err);
    });


})





app.listen(3000, () => console.log('my server is running'))