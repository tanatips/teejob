
let mySqlExecute = require('../../../../BusinessData/Execute/File_MySQL_Execute.js');

let Cls_JobSite_SQL = require('../../../../SQLFactory/Profile/Custom/JobSite/Cls_JobSite_SQL.js');


class Cls_JobSite_Models {

    constructor() {

        this.sqlFactory = new Cls_JobSite_SQL();
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

    Fn_GetJobSiteAll(callback) {

        let sql = this.sqlFactory.Fn_GetJobSiteAll();

        mySqlExecute.Select(sql, function (resultData) {

            callback(resultData);
        });
    }
};

module.exports = Cls_JobSite_Models;

