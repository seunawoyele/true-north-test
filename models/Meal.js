const Sequelize = require('sequelize')
const db = require('./_db')


const Meal = db.define('Meal', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        validate: {}
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {}
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {}
    },
    price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {}
    },

},

    {
        tableName: 'tbl_meal',
        freezeTableName: true,
        underscored: true,
        timestamps: false
    }
)

module.exports = Meal;