'use strict';
const select = (connection, res) => {
    // simple query
    connection.query(
        'SELECT * FROM "INSERT PROPER TABLE HERE"',
        (err, results, fields) => {
            // console.log(results); // results contains rows returned by server
            // console.log(fields); // fields contains extra meta data about results, if available
            if (err == null) {
                res.send(results);
            } else {
                console.log(err);
            }
        },
    );
};

const insert = (data, connection, res) => {
    // simple query
    connection.execute(
        'INSERT INTO "INSERT PROPER TABLE HERE" (category, title, details, thumbnail, image, original, coordinates, userID) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
        data,
        (err, results, fields) => {
            // console.log(results); // results contains rows returned by server
            // console.log(fields); // fields contains extra meta data about results, if available
            if (err == null) {
                res.send(results);
            } else {
                console.log(err);
            }
        },
    );
};

const update = (data, connection, res) => {
    // simple query
    connection.execute(
        'UPDATE "INSERT PROPER TABLE HERE" SET category = ?, title = ?, details = ? WHERE mID = ? AND userID = ?;',
        data,
        (err, results, fields) => {
            // console.log(results); // results contains rows returned by server
            // console.log(fields); // fields contains extra meta data about results, if available
            if (err == null) {
                res.send(results);
            } else {
                console.log(err);
            }
        },
    );
};

const del = (data, connection, res) => {
    // simple query
    connection.execute(
        'DELETE FROM "INSERT PROPER TABLE HERE" WHERE mID = ? AND userID = ?;', // can delete only current user's images
        data,
        (err, results, fields) => {
            console.log(results); // results contains rows returned by server
            // console.log(fields); // fields contains extra meta data about results, if available
            if (err == null) {
                res.send(results);
            } else {
                console.log(err);
            }
        },
    );
};

module.exports = {
    select: select,
    insert: insert,
    update: update,
    del: del,
};