
let mySqlExecute = require('../../../../BusinessData/Execute/File_MySQL_Execute.js');

let Cls_Customer_SQL = require('../../../../SQLFactory/Profile/Custom/Customer/Cls_Customer_SQL.js');


class Cls_Customer_Models {

    constructor() {

        this.sqlFactory = new Cls_Customer_SQL();
    }

    Fn_Search(dataItem, callback) {

        let sql = this.sqlFactory.Fn_Search(dataItem);

        mySqlExecute.SelectList(sql, function (resultData) {

            callback(resultData);
        });
    }

    Fn_Insert(dataItem, callback) {

        let sql = this.sqlFactory.Fn_Insert(dataItem);

        mySqlExecute.Insert(sql, function (resultData) {

            callback(resultData);
        });
    }

    Fn_Update(dataItem, callback) {

        let sql = this.sqlFactory.Fn_Update(dataItem);

        mySqlExecute.Update(sql, function (resultData) {

            callback(resultData);
        });
    }

    Fn_Delete(dataItem, callback) {

        let sql = this.sqlFactory.Fn_Delete(dataItem);

        mySqlExecute.Delete(sql, function (resultData) {

            callback(resultData);
        });
    }

    Fn_GetCustomerAll(callback) {

        let sql = this.sqlFactory.Fn_GetCustomerAll();

        mySqlExecute.Select(sql, function (resultData) {

            callback(resultData);
        });
    }
};

module.exports = Cls_Customer_Models;

