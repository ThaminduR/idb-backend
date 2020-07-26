var mysql = require('mysql')

class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DBHOST,
            user: process.env.DBUSER,
            password: process.env.DBPASSWORD,
            database: process.env.DBNAME
        });
    }

    const pool = mysql.createPool(Database);
    pool() {
        mysql.createPool(this)
        connection = () => {
            return new Promise((resolve, reject) => {
                pool.getConnection((err, connection) => {
                    if (err) reject(err);
                    console.log("MySQL pool connected: threadId " + connection.threadId);
                    const query = (sql, binding) => {
                        return new Promise((resolve, reject) => {
                            connection.query(sql, binding, (err, result) => {
                                if (err) reject(err);
                                resolve(result);
                            });
                        });
                    };
                    const release = () => {
                        return new Promise((resolve, reject) => {
                            if (err) reject(err);
                            console.log("MySQL pool released: threadId " + connection.threadId);
                            resolve(connection.release());
                        });
                    };
                    resolve({ query, release });
                });
            });
        };
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
}

module.exports = Database;