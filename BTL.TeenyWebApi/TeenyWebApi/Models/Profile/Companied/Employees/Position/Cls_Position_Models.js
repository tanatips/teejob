
let mySqlExecute = require('../../../../../BusinessData/Execute/File_MySQL_Execute.js');

let Cls_Position_SQL = require('../../../../../SQLFactory/Profile/Companied/Employees/Position/Cls_Position_SQL.js');


class Cls_Position_Models {

    constructor() {

        this.sqlFactory = new Cls_Position_SQL();
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

    Fn_GetPositionAll(callback) {

        let sql = this.sqlFactory.Fn_GetPositionAll();

        mySqlExecute.Select(sql, function (resultData) {

            callback(resultData);
        });
    }

    Fn_GetPositionByDepartment(dataItem, callback) {

        let sql = this.sqlFactory.Fn_GetPositionByDepartment(dataItem);

        mySqlExecute.Select(sql, function (resultData) {

            callback(resultData);
        });
    }
};

module.exports = Cls_Position_Models;

