
let mySqlExecute = require('../../../../../BusinessData/Execute/File_MySQL_Execute.js');

let Cls_Product_SQL = require('../../../../../SQLFactory/Profile/Companied/Factory/Product/Cls_Product_SQL.js');


class Cls_Product_Models {

    constructor() {

        this.sqlFactory = new Cls_Product_SQL();
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

    Fn_GetProductAll(callback) {

        let sql = this.sqlFactory.Fn_GetProductAll();

        mySqlExecute.Select(sql, function (resultData) {

            callback(resultData);
        });
    }

    Fn_GetProductnByProductGroup(dataItem, callback) {

        let sql = this.sqlFactory.Fn_GetProductnByProductGroup(dataItem);

        mySqlExecute.Select(sql, function (resultData) {

            callback(resultData);
        });
    }
};

module.exports = Cls_Product_Models;

