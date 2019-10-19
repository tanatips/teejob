
let mySqlExecute = require('../../../../../BusinessData/Execute/File_MySQL_Execute.js');

let Cls_Employee_SQL = require('../../../../../SQLFactory/Profile/Companied/Employees/Employee/Cls_Employee_SQL.js');


class Cls_Employee_Models {

    constructor() {

        this.sqlFactory = new Cls_Employee_SQL();
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

    Fn_GetEmployeeAll(callback) {

        let sql = this.sqlFactory.Fn_GetEmployeeAll();

        mySqlExecute.Select(sql, function (resultData) {

            callback(resultData);
        });
    }

    Fn_GetEmployeeByPlant(dataItem, callback) {

        let sql = this.sqlFactory.Fn_GetEmployeeByPlant(dataItem);

        mySqlExecute.Select(sql, function (resultData) {

            callback(resultData);
        });
    }

    Fn_GetEmployeeByPosition(dataItem, callback) {

        let sql = this.sqlFactory.Fn_GetEmployeeByPosition(dataItem);

        mySqlExecute.Select(sql, function (resultData) {

            callback(resultData);
        });
    }

    Fn_GetEmployeeByCondition(dataItem, callback) {

        let sql = this.sqlFactory.Fn_GetEmployeeByCondition(dataItem);

        mySqlExecute.Select(sql, function (resultData) {

            callback(resultData);
        });
    }
};

module.exports = Cls_Employee_Models;

