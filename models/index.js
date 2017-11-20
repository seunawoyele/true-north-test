//models
const Restorant = require('./Restorant')
const Meal = require('./Meal')
const Review = require('./Review')
const Order = require('./Order')
const OrderDetail = require('./OrderDetail')
//asociations

Restorant.hasMany(Meal, {
    foreignKey: 'restorant_id',
    allowNull: false,
    as: 'meals'
});
Restorant.hasMany(Review, {
    foreignKey: 'restorant_id',
    allowNull: false,
    targetKey: 'reviews'
});

Order.hasMany(OrderDetail, {
    foreignKey: 'order_id',
    allowNull: false,
    as:"details"
});

Meal.belongsTo(Restorant);
Review.belongsTo(Restorant);
Order.belongsTo(Restorant);
OrderDetail.belongsTo(Order, { as: 'details' });


module.exports = { Restorant, Meal, Review, Order, OrderDetail }