//models
const Restorant = require('./Restorant')
const Meal = require('./Meal')
const Review = require('./Review')
const Order = require('./Order')
const OrderDetail = require('./OrderDetail')
//asociations

Restorant.hasMany(Meal, {
    foreignKey: 'restorant_id',
    constraints: false,
    targetKey: 'meals'
});
Restorant.hasMany(Review, {
    foreignKey: 'restorant_id',
    constraints: false,
    targetKey: 'reviews'
});

Order.hasMany(OrderDetail, {
    foreignKey: 'order_id',
    constraints: false,
    targetKey: 'details'
});

Meal.belongsTo(Restorant);
Review.belongsTo(Restorant);
OrderDetail.belongsTo(Order);


module.exports = { Restorant, Meal, Review, Order, OrderDetail }