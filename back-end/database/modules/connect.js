const pg = require('pg');

var pgdb = new pg.Pool({
    host:'148.70.223.218',
    port:5432,
    password:'123',
    database:'memory',
    user:'owner'
})

module.exports = pgdb;