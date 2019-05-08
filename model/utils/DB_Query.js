'use strict';
const db = require('./DBConnection');
const connection = db.connect();

const selectUserInfo = (data, res) => {
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
const selectEmail = (data,res) => {
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

const registerUser = (data, next) => {
    // For adding new users (Register)
    connection.execute(
        'INSERT INTO User (UserName, Password, Email, Phone, Location, typeID) VALUES (?, ?, ?, ?, ?, ?);',
        data,
        (err, results, fields) => {
            // console.log(results); // results contains rows returned by server
            // console.log(fields); // fields contains extra meta data about results, if available
                console.log(results);
                console.log(err);
                next();
        },
    );
};
const loginUser = (data, callback) => {
    // used to get user information for login process
    // Where Email
    db.connect().execute(
        'SELECT * FROM User WHERE UserName = ?;',
        data,
        (err, results, fields) => {
            console.log('results', results); // results contains rows returned by server
            // console.log(fields); // fields contains extra meta data about results, if available
            console.log(err + ' query');
            callback(results);
        },
    );
};

const updateUserInfo = (data, res) => {
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

const changePassword = (data, next) => {
    // Changing the password, this is done separately from changing the other user information because additional checks are needed
    connection.execute(
        'UPDATE User SET Password = ? WHERE userID = ?;',
        data,
        (err, results, fields) => {
            // console.log(results); // results contains rows returned by server
            // console.log(fields); // fields contains extra meta data about results, if available
            console.log(results);
            console.log(err);
            next();
        },
    );
};

const getpassword = (data, callback)=>{
    // This is used for getting the old password, so we can do a check when user is changing the password
    connection.query(
        'SELECT Password FROM User WHERE UserName = ?;',
        data,
            (err, results, fields) => {
                console.log('results', results); // results contains rows returned by server
                // console.log(fields); // fields contains extra meta data about results, if available
                console.log(err);
                callback(results);
        },

    );
};

const getusername = (data, res) =>{
  // This is used for getting the old password, so we can do a check when user is changing the password
  connection.query(
      'SELECT UserName FROM User WHERE UserName = ?;',
      data,
      (err, results, fields) => {
        console.log(results);
        if (err == null) {
          res.send(results);
        } else {
          console.log(err);
        }
        // console.log(results); // results contains rows returned by server
        // console.log(fields); // fieldds contains extra meta data about results, if available
      },
  );
};

const selectProductInfo = (sql,callback) => {
  sql = sql.toString();
  console.log(sql);
    // Used for selecting specific Product information'
    connection.query(
        sql,
        (err, results, fields) => {
          console.log('RESULTS ' + results);
            console.log(err);
          callback(results);
        }
 /* const selectedType = [type.options[type.selectedIndex].value];
  const selectedBrand = [brand.options[brand.selectedIndex].value];
  const selectedCond = [cond.options[cond.selectedIndex].value];
  const selMinPrice = minPrice.value;
  const selMaxPrice = maxPrice.value;
*/
);
};
const selectUserProducts = (data,res)=>{
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
const insertProduct = (data) => {
    // Used for adding a new product to database
    //name, brand, description, "not",condition,ptype,price, "8"
    connection.execute(
        'INSERT INTO Product (pName, pBrand, Description, soldStatus, pCondition, pType, Price, uID) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
        data,
        (err, results, fields) => {
            if (err == null) {
                console.log(results);
            } else {
                console.log(err);
            }
        },
    );
};
const deleteProduct = (data,res) =>{
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

const updateProductInfo = (data, res) => {
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
const productSoldStatus = (data,res) => {
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
const productSoldTime = (data,res) => {
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

const selectAllImages = (data, res) => {
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

const selectTopImage = (data,res) => {
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

const insertImage = (data, res) => {
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

const delImage = (data, res) => {
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
const selectLatestProduct = (callback) => {
    connection.query(
    'SELECT pID FROM Product ORDER by `ProductAdded` DESC LIMIT 1;',
    (err, results, fields) => {
        if(err === null){
            callback(results);
        }else{
            console.log(err);
        }
    },
    );
};

module.exports = {
    selectUserInfo: selectUserInfo,
    registerUser: registerUser,
    loginUser: loginUser,
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
    selectLatestProduct: selectLatestProduct,
};