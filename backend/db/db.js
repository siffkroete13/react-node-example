const mysql = require('mysql');

class DB {
    constructor() {
        this.conn = false;
        this.connected = false;
        this.getConnection = this.getConnection.bind(this);
        this.closeConnection = this.closeConnection.bind(this);
    }
   
    getConnection(credentials) {
        if(!this.connected || !this.conn) {
            this.conn = mysql.createConnection({
                host     : credentials.localhost || '',
                user     : credentials.user || '',
                password : credentials.password || '',
                database : credentials.database || ''
            });
            this.conn.connect();
        }

        this.connected = true;
        return this.conn;
    }

    closeConnection() {
        if(this.conn) this.conn.end();
    }
}

const db = new DB();

module.exports = {

    getConnection: function(credentials) {
        return db.getConnection(credentials);
    },

    closeConnection: function() {
        return db.closeConnection();
    }
}
