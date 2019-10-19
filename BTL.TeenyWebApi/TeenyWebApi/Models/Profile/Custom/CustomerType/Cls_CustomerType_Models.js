
let mySqlExecute = require('../../../../BusinessData/Execute/File_MySQL_Execute.js');

let Cls_CustomerType_SQL = require('../../../../SQLFactory/Profile/Custom/CustomerType/Cls_CustomerType_SQL.js');


class Cls_CustomerType_Models {

    constructor() {

        this.sqlFactory = new Cls_CustomerType_SQL();
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
    
    Fn_GetCustomerTypeAll(callback) {

        let sql = this.sqlFactory.Fn_GetCustomerTypeAll();

        mySqlExecute.Select(sql, function (resultData) {

            callback(resultData);
        });
    }

};

module.exports = Cls_CustomerType_Models;
