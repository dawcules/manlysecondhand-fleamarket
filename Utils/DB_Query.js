'use strict';
const selectUserInfo = (connection, res) => {
    // Selects your user information (When you login)
    connection.query(
        'SELECT UserName,Email,Phone,Location FROM User WHERE userID = ?;',
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
const insertUser = (data, connection, res) => {
    // For adding new users (Register)
    connection.execute(
        'INSERT INTO User (UserName, Password, Email, Phone, Location, uID,typeID) VALUES (?, ?, ?, ?, ?, ?, ?);',
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

const updateUserInfo = (data, connection, res) => {
    // Updating the account user information
    connection.execute(
        'UPDATE User SET Email = ?, Phone = ?, Location = ? WHERE userID = ?;',
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
const changePassword = (data, connection, res) => {
    // Changing the password, this is done separately from changing the other user information because additional checks are needed
    connection.execute(
        'UPDATE User SET Password = ? WHERE userID = ?;',
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
const oldPassword = (connection,res)=>{
    // This is used for getting the old password, so we can do a check when user is changing the password
    connection.query(
        'SELECT Password FROM User WHERE userID = ?;',
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
}

const selectAllImages = (connection, res) => {
    // selects all images
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
    // Inserts the data to Image table in the Database
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

const delImage = (data, connection, res) => {
    // simple query
    connection.execute(
        'DELETE FROM Image where iID = ?;',
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
    selectUserInfo: selectUserInfo,
    insertUser: insertUser,
    updateUserInfo: updateUserInfo,
    changePassword: changePassword,
    oldPassword : oldPassword,
    selectAllImages: selectAllImages,
    insertImage: insertImage,
    delImage: delImage,


};