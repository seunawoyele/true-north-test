const Sequelize = require('sequelize')
const db = require('./_db')


const Review = db.define('Review', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        validate: {}
    },
    review: {
        type: Sequelize.TEXT,
        allowNull: true,
        validate: {}
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {}
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {}
    }

},

    {
        tableName: 'tbl_review',
        freezeTableName: true,
        underscored: true,
        timestamps: false
    }
)

module.exports = Review;