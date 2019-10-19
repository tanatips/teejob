
let mySqlExecute = require('../../../BusinessData/Execute/File_MySQL_Execute.js');

let Cls_Shipment_SQL = require('../../../SQLFactory/Worker/Shipment/Cls_Shipment_SQL.js');


class Cls_Shipment_Models {

    constructor() {

        this.sqlFactory = new Cls_Shipment_SQL();
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

    Fn_GetShipmentAll(callback) {

        let sql = this.sqlFactory.Fn_GetShipmentAll();

        mySqlExecute.Select(sql, function (resultData) {

            callback(resultData);
        });
    }

    Fn_GetShipmentByCondition(dataItem, callback) {

        let sql = this.sqlFactory.Fn_GetShipmentByCondition(dataItem);

        mySqlExecute.Select(sql, function (resultData) {

            callback(resultData);
        });
    }

    Fn_GetShipmentByOrder(dataItem, callback) {

        let sql = this.sqlFactory.Fn_GetShipmentByOrder(dataItem);

        mySqlExecute.Select(sql, function (resultData) {

            callback(resultData);
        });
    }

    Fn_GetShipmentByTruck(dataItem, callback) {

        let sql = this.sqlFactory.Fn_GetShipmentByTruck(dataItem);

        mySqlExecute.Select(sql, function (resultData) {

            callback(resultData);
        });
    }

    Fn_GetShipmentByEmployee(dataItem, callback) {

        let sql = this.sqlFactory.Fn_GetShipmentByEmployee(dataItem);

        mySqlExecute.Select(sql, function (resultData) {

            callback(resultData);
        });
    }
};

module.exports = Cls_Shipment_Models;

