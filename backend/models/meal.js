const db = require('../db/db');
const db_conn = db.getConnection({
    host     : 'localhost',
    user     : 'iwan',
    password : '1234',
    database : 'my_pizza_app'
});


class Meal {
    table_name = 'gerichte';
    primary_key = 'id';


    constructor() {
        this.query = this.query.bind(this);
        this.one = this.one.bind(this);
        this.all = this.all.bind(this);
    }

    query(_query, params) {
        if(params) { // Wenn es Parameter im SQL gibt
            return new Promise(function(resolve, reject) {
                if(!db_conn) reject('Keine Verbindung');
    
                db_conn.query(_query, params, (error, results, fields) => {
                    if (error) reject(error);
                    resolve(results);
                });
            });
        } else { // Wenn keine Parameter im SQL, d.h. get all.
            return new Promise(function(resolve, reject) {
                if(!db_conn) reject('Keine Verbindung');
    
                db_conn.query(_query, (error, results, fields) => {
                    if (error) reject(error);
                    resolve({results: results, fields: fields});
                });
            });
        }
    }

    one(id) {
        if(id) { 
            const _query = 'SELECT * from gerichte WHERE '+this.primary_key+'=?';
            const params = [];
            params.push(id);
            return this.query(_query, params);
        } else { // Wenn id=0 dann alle rows zurückgeben
            return this.all();
        }
    }

    all() { // Alle rows zurückgeben
        const _query = 'SELECT * from  ' + this.table_name;
        return this.query(_query);
    }

    close() {
        db.closeConnection();
    }
}

module.exports = function() {
    const item = new Meal();
    return item;
}
