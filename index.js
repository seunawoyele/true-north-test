const express = require('express')
const app = express()
const models = require("./models");
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const _ = require("lodash");

///google api
const google_key = require("./config/maps.json").google_key;
const distance = require('google-distance-matrix');


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

        _.forEach(rests, function (value) {

            let revs = value.dataValues.Reviews;
            let acum = _.sumBy(revs, 'rating');
            let total_reviews = _.size(revs)
            value.dataValues.rating_avg = acum / total_reviews; ///rating AVG
        })

        res.send(rests)
    })

})


/**
 * GET
 * to list restorants, filter by rating
 */
app.get('/restorants/:rating', function (req, res) {

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

        let restsFiltered = [];

        _.forEach(rests, function (value) {

            let revs = value.dataValues.Reviews;
            let acum = _.sumBy(revs, 'rating');
            let total_reviews = _.size(revs)
            value.dataValues.rating_avg = acum / total_reviews; ///rating AVG

            if (value.dataValues.rating_avg == req.params.rating) ///filter by rating 
                restsFiltered.push(value)

        })

        res.send(restsFiltered)
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

    ///ETA
    models.Restorant.findById(myObject.restorantId).then(resto => {

        if (resto) {

            ///origin data 
            let origin_address = resto.dataValues.address;
            let origin_latLng = resto.dataValues.location;

            ////destination data
            let destination_address = myObject.address;
            let destination_latLng = myObject.location;

            distance.key(google_key); ///use google map api
            distance.mode('bicycling');
            distance.units('imperial');

            var origins = [origin_address, origin_latLng];
            var destinations = [destination_address, destination_latLng];


            distance.matrix(origins, destinations, function (err, distances) {
                if (err) {
                    return console.log(err);
                }
                if (!distances) {
                    return console.log('no distances');
                }
                if (distances.status == 'OK') {

                    let eta = distances.rows[0].elements[0].duration.text //shortest distance duration
                    myObject.eta = eta;
                    models.Order.create(myObject, {
                        include: [{
                            model: models.OrderDetail,
                            as: 'details'
                        }]
                    }).then(function (instance) {
                        console.log(instance)
                        let success = { "success": true, "msg": "order #" + instance.dataValues.id + " created", "details": instance }
                        res.send(success)
                    }).catch(function (err) {
                        console.error(err);
                    });

                }
            });

        }



    }).catch(error => {

    })

})





app.listen(3000, () => console.log('my server is running'))