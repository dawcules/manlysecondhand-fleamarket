'use strict';
const selectUserInfo = (data,connection, res) => {
    // Selects your user information (When you login)
    connection.query(
        'SELECT UserName,Email,Phone,Location FROM User WHERE userID = ?;',data,
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
const selectEmail = (data,connection,res) => {
    //used for checking if teh selected email exists, this prevents creation of duplicate accounts
    connection.query(
        'SELECT Email FROM USER where Email = ?;',data,
        (err,results,fields) => {
            if(err == null){
                res.send(results);
            }else{
                console.log(err);
            }
        },
    );
};

const insertUser = (data, connection, res) => {
    // For adding new users (Register)
    connection.execute(
        'INSERT INTO User (UserName, Password, Email, Phone, Location, typeID) VALUES (?, ?, ?, ?, ?, ?);',
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
const getpassword = (data,connection)=>{
    // This is used for getting the old password, so we can do a check when user is changing the password
    connection.query(
        'SELECT Password FROM User WHERE UserName = ?;',
        data,
        (err, results, fields) => {
          if (err == null) {
            return(results[0]);
          } else {
            console.log(err);
          }
            // console.log(results); // results contains rows returned by server
            // console.log(fields); // fields contains extra meta data about results, if available
        },

    );
};

const getusername = (data, connection) =>{
  // This is used for getting the old password, so we can do a check when user is changing the password
  connection.query(
      'SELECT UserName FROM User WHERE UserName = ?;',
      data,
      (err, results, fields) => {
        if (err == null) {
          return(results[0]);
        } else {
          console.log(err);
        }
        // console.log(results); // results contains rows returned by server
        // console.log(fields); // fieldds contains extra meta data about results, if available
      },
  );
};

const selectProductInfo = (data,connection, res) => {
    // Used for selecting specific Product information
    connection.query(
        'SELECT pName,pBrand,Description,Condition,pTYpe,Price,ProductAdded FROM Product WHERE pID = ?;',data,
        (err, results, fields) => {
        if (err == null) {
            res.send(results);
        } else {
            console.log(err);
        }
    },
);
};
const selectUserProducts = (data,connection,res)=>{
    //Shows all products selected user has listed
    connection.query(
        'SELECT pName,pBrand,Description,Condition,pType,Price,ProductAdded FROM Product WHERE uID = ?;',data,
        (err,results,fieds)=>{
            if(err == null){
                res.send(results);
            }else{
                console.log(err);
            }
        },
    );
};
const insertProduct = (data, connection, res) => {
    // Used for adding a new product to database
    connection.execute(
        'INSERT INTO Product (pName, pBrand, Location, Alt, Thumb, Medium) VALUES (?, ?, ?, ?, ?, ?);',
        data,
        (err, results, fields) => {
            if (err == null) {
                res.send(results);
            } else {
                console.log(err);
            }
        },
    );
};
const deleteProduct = (data,connection,res) =>{
    //Used for deleting the unwanted products
    connection.execute(
        'DELETE FROM Product Where pID = ? AND uID = ?;',data,
        (err,results,fields)=> {
            if(err == null){
                res.send(results)
            }else{
                console.log(err)
            }
        },
    );
};

const updateProductInfo = (data, connection, res) => {
    // Updating chosen products information
    connection.execute(
        'UPDATE Product SET pName = ?, pBrand = ?, Description = ?, Condition = ?, pType = ?, Price = ? WHERE pID = ? AND userID = ?;',
        data,
        (err, results, fields) => {
            if (err == null) {
                res.send(results);
            } else {
                console.log(err);
            }
        },
    );
};
const productSoldStatus = (data,connection,res) => {
    //Updates the products sold state
    connection.execute(
    'UPDATE Product SET soldStatus = SOLD WHERE pID = ?;',
        data,
        (err,results,fields) =>{
            if(err == null){
                res.send(results);
            }else{
                console.log(err);
            }
        },
    );
};
const productSoldTime = (data,connection,res) => {
    // updates the products sold timestamp
    connection.execute(
        'UPDATE Product SET ProductSold = ? where pID = ?;',data,
        (err,results,fields) =>{
        if (err == null) {
            res.send(results);
        } else {
            console.log(err);
        }
    },
    );
};

const selectAllImages = (data ,connection, res) => {
    // selects all images for the product
    connection.query(
        'SELECT * FROM Image WHERE iID = ? and pID = ?', data,
        (err, results, fields) => {
            if (err == null) {
                res.send(results);
            } else {
                console.log(err);
            }
        },
    );
};

const selectTopImage = (data,connection,res) => {
    connection.query(
        'SELECT * FROM Image WHERE iID = ? and pID = ? ORDER BY iID DESC LIMIT 1;', data,
        (err, results, fields) =>{
            if(err == null){
                res.send(results);
            }else{
                console.log(err);
            }
        },
    );
};

const insertImage = (data, connection, res) => {
    // Inserts the data to Image table in the Database
    connection.execute(
        'INSERT INTO Image (Title, Location, Alt, Thumb, Medium, pID) VALUES (?, ?, ?, ?, ?, ?);',
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
        'DELETE FROM Image where iID = ? and pID = ?;',
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
    getpassword : getpassword,
    selectProductInfo: selectProductInfo,
    selectUserProducts: selectUserProducts,
    insertProduct: insertProduct,
    deleteProduct: deleteProduct,
    updateProductInfo: updateProductInfo,
    productSoldStatus: productSoldStatus,
    productSoldTime: productSoldTime,
    selectAllImages: selectAllImages,
    insertImage: insertImage,
    delImage: delImage,
    selectTopImage: selectTopImage,
    selectEmail: selectEmail,
    getusername: getusername,
};