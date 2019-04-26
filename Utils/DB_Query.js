'use strict';
const select = (connection, res) => {
    // simple query
    connection.query(
        'SELECT * FROM Image',
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

const insertImage = (data, connection, res) => {
    // INSERT PROPER TABLE HERE
    connection.execute(
        'INSERT INTO Image (iID, Title, Location, Alt, Thumb, Medium) VALUES (?, ?, ?, ?, ?, ?);',
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

const updateImage = (data, connection, res) => {
    // simple query
    connection.execute(
        'UPDATE Image SET Title = ?, title = ?, details = ? WHERE iID = ? AND userID = ?;',
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

const delImage = (data, connection, res) => {
    // simple query
    connection.execute(
        'DELETE FROM Image JOIN Product ON iID = ? AND Product.userID = ?;', // can delete only current user's images
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