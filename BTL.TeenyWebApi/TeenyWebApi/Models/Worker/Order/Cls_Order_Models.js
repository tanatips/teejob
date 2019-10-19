
let mySqlExecute = require('../../../BusinessData/Execute/File_MySQL_Execute.js');

let Cls_Order_SQL = require('../../../SQLFactory/Worker/Order/Cls_Order_SQL.js');


class Cls_Order_Models {

    constructor() {

        this.sqlFactory = new Cls_Order_SQL();
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

    Fn_GetOrderAll(callback) {

        let sql = this.sqlFactory.Fn_GetOrderAll();

        mySqlExecute.Select(sql, function (resultData) {

            callback(resultData);
        });
    }

    Fn_GetOrderByCustomer(dataItem, callback) {

        let sql = this.sqlFactory.Fn_GetOrderByCustomer(dataItem);

        mySqlExecute.Select(sql, function (resultData) {

            callback(resultData);
        });
    }

    Fn_GetOrderByUnit(dataItem, callback) {

        let sql = this.sqlFactory.Fn_GetOrderByUnit(dataItem);

        mySqlExecute.Select(sql, function (resultData) {

            callback(resultData);
        });
    }

    Fn_GetOrderByCondition(dataItem, callback) {

        let sql = this.sqlFactory.Fn_GetOrderByCondition(dataItem);

        mySqlExecute.Select(sql, function (resultData) {

            callback(resultData);
        });
    }
};

module.exports = Cls_Order_Models;

