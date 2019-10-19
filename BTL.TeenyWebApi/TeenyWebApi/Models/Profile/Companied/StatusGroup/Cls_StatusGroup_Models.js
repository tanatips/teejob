
let mySqlExecute = require('../../../../BusinessData/Execute/File_MySQL_Execute.js');

let Cls_StatusGroup_SQL = require('../../../../SQLFactory/Profile/Companied/StatusGroup/Cls_StatusGroup_SQL.js');


class Cls_StatusGroup_Models {

    constructor() {

        this.sqlFactory = new Cls_StatusGroup_SQL();
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

    Fn_GetStatusGroupAll(callback) {

        let sql = this.sqlFactory.Fn_GetStatusGroupAll();

        mySqlExecute.Select(sql, function (resultData) {

            callback(resultData);
        });
    }

};

module.exports = Cls_StatusGroup_Models;

