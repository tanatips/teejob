
let mySqlExecute = require('../../../../../BusinessData/Execute/File_MySQL_Execute.js');

let Cls_Material_SQL = require('../../../../../SQLFactory/Profile/Companied/Store/Material/Cls_Material_SQL.js');


class Cls_Material_Models {

    constructor() {

        this.sqlFactory = new Cls_Material_SQL();
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

    Fn_GetMaterialAll(callback) {

        let sql = this.sqlFactory.Fn_GetMaterialAll();

        mySqlExecute.Select(sql, function (resultData) {

            callback(resultData);
        });
    }

    Fn_GetMaterialByMaterialType(dataItem, callback) {

        let sql = this.sqlFactory.Fn_GetMaterialByMaterialType(dataItem);

        mySqlExecute.Select(sql, function (resultData) {

            callback(resultData);
        });
    }
};

module.exports = Cls_Material_Models;

